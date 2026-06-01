import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "../lib/supabaseClient";
import { sanitizeInput } from "../lib/sanitize";

type ChatMessage = {
  id: string | number;
  room_id: string | number;
  sender_type: "visitor" | "admin" | "system";
  sender_name: string | null;
  message: string;
  created_at: string;
};

const STORAGE_VISITOR_KEY = "stride-live-chat-visitor-id";
const STORAGE_ROOM_KEY = "stride-live-chat-room-id";

const createVisitorId = () =>
  `visitor_${Math.random().toString(36).slice(2, 10)}_${Date.now()}`;

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [visitorId] = useState<string>(
    () => localStorage.getItem(STORAGE_VISITOR_KEY) ?? createVisitorId(),
  );
  const [roomId, setRoomId] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_ROOM_KEY),
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageDraft, setMessageDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_VISITOR_KEY, visitorId);
    if (roomId) localStorage.setItem(STORAGE_ROOM_KEY, roomId);
  }, [visitorId, roomId]);

  useEffect(() => {
    if (!roomId) return;

    const channel = supabase.channel(`live-chat-room-${roomId}`).on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "chat_messages",
        filter: `room_id=eq.${roomId}`,
      },
      (payload) => {
        const incoming = payload.new as ChatMessage;
        setMessages((prev) => [...prev, incoming]);
      },
    );

    void channel.subscribe();

    return () => {
      void channel.unsubscribe();
    };
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    const loadMessages = async () => {
      setLoading(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: true })
        .returns<ChatMessage[]>();

      if (fetchError) {
        setError("Unable to load chat history.");
      } else {
        setMessages(data || []);
      }

      setLoading(false);
    };

    void loadMessages();
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const createRoom = async () => {
    const payload = {
      visitor_id: visitorId,
      visitor_name: "Guest",
      visitor_email: null,
      status: "open" as const,
    };

    const { data, error: insertError } = await supabase
      .from("chat_rooms")
      .insert(payload)
      .select("id")
      .single<{ id: string | number }>();

    if (insertError || !data?.id) {
      throw new Error("Unable to open chat room.");
    }

    const newRoomId = String(data.id);
    setRoomId(newRoomId);
    return newRoomId;
  };

  const handleSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const trimmed = messageDraft.trim();
    if (!trimmed) {
      setError("Type a message to continue.");
      return;
    }

    setMessageDraft("");
    setLoading(true);

    try {
      const activeRoomId = roomId ?? (await createRoom());
      const payload = {
        room_id: activeRoomId,
        sender_type: "visitor",
        sender_name: "Guest",
        message: sanitizeInput(trimmed),
      };

      const { error: messageError } = await supabase
        .from("chat_messages")
        .insert(payload);
      if (messageError) throw messageError;
    } catch {
      setError("Unable to send your message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const canSend = !!messageDraft.trim();

  return (
    <div
      className={`live-chat-widget${open ? " open" : ""}`}
      aria-live="polite"
    >
      <button
        type="button"
        className={`live-chat-toggle${open ? " open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <span className="chat-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </span>
        <span className="chat-label">Chat</span>
      </button>

      <div className="live-chat-panel" hidden={!open}>
        <button
          type="button"
          className="live-chat-close"
          onClick={() => setOpen(false)}
          aria-label="Close chat"
        >
          ×
        </button>
        <div className="live-chat-body">
          {error && <div className="alert alert-error chat-error">{error}</div>}

          <div className="chat-messages-wrapper">
            {loading && <div className="chat-status">Loading messages…</div>}
            {!loading && messages.length === 0 && (
              <div className="chat-empty">No messages yet.</div>
            )}
            <div className="chat-messages">
              {messages.map((item) => (
                <div
                  key={String(item.id)}
                  className={`chat-message ${item.sender_type === "admin" ? "admin" : "visitor"}`}
                >
                  <div className="chat-message-content">
                    <p>{item.message}</p>
                    <span>
                      {item.sender_type === "admin"
                        ? "Operations"
                        : item.sender_name || "You"}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        <form className="live-chat-form" onSubmit={handleSend}>
          <label className="screen-reader-only" htmlFor="chatMessage">
            Message
          </label>
          <textarea
            id="chatMessage"
            value={messageDraft}
            onChange={(event) => setMessageDraft(event.target.value)}
            placeholder="Type your message..."
            rows={3}
          />
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!canSend || loading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
