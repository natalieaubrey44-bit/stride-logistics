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
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageDraft, setMessageDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"open" | "closed" | "pending">(
    "pending",
  );
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
        setStatus("open");
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

      const { data, error: fetchError } = await (
        supabase.from("chat_messages") as any
      )
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: true });

      if (fetchError) {
        setError("Unable to load chat history.");
      } else {
        setMessages(data || []);
        setStatus("open");
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
      visitor_name: visitorName.trim() || "Guest",
      visitor_email: visitorEmail.trim() || null,
      status: "open" as const,
    };

    const { data, error: insertError } = await (
      supabase.from("chat_rooms") as any
    )
      .insert(payload)
      .select("id")
      .single();

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

    if (!roomId && !visitorName.trim() && !visitorEmail.trim()) {
      setError("Please provide your name or email before sending.");
      return;
    }

    setMessageDraft("");
    setLoading(true);

    try {
      const activeRoomId = roomId ?? (await createRoom());
      const payload = {
        room_id: activeRoomId,
        sender_type: "visitor",
        sender_name: visitorName.trim() || "Guest",
        message: sanitizeInput(trimmed),
      };

      const { error: messageError } = await supabase
        .from("chat_messages")
        .insert(payload);
      if (messageError) throw messageError;

      setStatus("open");
    } catch (error) {
      setError("Unable to send your message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const canSend =
    !!messageDraft.trim() &&
    (roomId || visitorName.trim() || visitorEmail.trim());

  return (
    <div
      className={`live-chat-widget${open ? " open" : ""}`}
      aria-live="polite"
    >
      <button
        type="button"
        className="live-chat-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span>Need help?</span>
        <strong>{open ? "Close" : "Chat"}</strong>
      </button>

      <div className="live-chat-panel" hidden={!open}>
        <div className="live-chat-header">
          <div>
            <span>Live support</span>
            <p>
              Send a message and our operations team can reply in the dashboard.
            </p>
          </div>
          <span className={`live-chat-status ${status}`}>
            {status === "open" ? "Waiting for reply" : "Start the chat"}
          </span>
        </div>

        <div className="live-chat-body">
          {!roomId && (
            <div className="live-chat-meta">
              <div className="field">
                <label htmlFor="visitorName">Your name</label>
                <input
                  id="visitorName"
                  type="text"
                  value={visitorName}
                  onChange={(event) => setVisitorName(event.target.value)}
                  placeholder="Name"
                />
              </div>
              <div className="field">
                <label htmlFor="visitorEmail">Email address</label>
                <input
                  id="visitorEmail"
                  type="email"
                  value={visitorEmail}
                  onChange={(event) => setVisitorEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </div>
          )}

          {error && <div className="alert alert-error chat-error">{error}</div>}

          <div className="chat-messages-wrapper">
            {loading && <div className="chat-status">Loading messages…</div>}
            {!loading && messages.length === 0 && (
              <div className="chat-empty">
                No messages yet. Share your question and an operations agent
                will reply here.
              </div>
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
            {roomId ? "Send message" : "Start chat"}
          </button>
        </form>
      </div>
    </div>
  );
}
