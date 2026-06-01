import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "../lib/supabaseClient";
import { sanitizeInput } from "../lib/sanitize";

type ChatRoom = {
  id: string | number;
  visitor_id: string;
  visitor_name: string | null;
  visitor_email: string | null;
  status: "open" | "closed";
  created_at: string;
};

type ChatMessage = {
  id: string | number;
  room_id: string | number;
  sender_type: "visitor" | "admin" | "system";
  sender_name: string | null;
  message: string;
  created_at: string;
};

const formatTimestamp = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    day: "numeric",
    month: "short",
  });

export default function AdminChatPanel() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | number | null>(
    null,
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [adminDraft, setAdminDraft] = useState("");
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const loadRooms = useCallback(async () => {
    setLoadingRooms(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("chat_rooms")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20)
      .returns<ChatRoom[]>();

    if (fetchError) {
      setError("Unable to load chat rooms.");
    } else {
      setRooms(data || []);
      setSelectedRoomId((currentRoomId) => currentRoomId ?? data?.[0]?.id ?? null);
    }

    setLoadingRooms(false);
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadRooms);
  }, [loadRooms]);

  useEffect(() => {
    const channel = supabase.channel("admin-chat-room-list");

    channel.on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "chat_rooms",
      },
      (payload) => {
        setRooms((prev) => [payload.new as ChatRoom, ...prev]);
      },
    );

    channel.on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "chat_messages",
      },
      (payload) => {
        const incoming = payload.new as ChatMessage;
        if (
          selectedRoomId &&
          String(incoming.room_id) === String(selectedRoomId)
        ) {
          setMessages((prev) => [...prev, incoming]);
        }
      },
    );

    void channel.subscribe();

    return () => {
      void channel.unsubscribe();
    };
  }, [selectedRoomId]);

  useEffect(() => {
    if (!selectedRoomId) return;

    const loadMessages = async () => {
      setLoadingMessages(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("room_id", selectedRoomId)
        .order("created_at", { ascending: true })
        .returns<ChatMessage[]>();

      if (fetchError) {
        setError("Unable to load messages for this room.");
      } else {
        setMessages(data || []);
      }

      setLoadingMessages(false);
    };

    void loadMessages();
  }, [selectedRoomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectedRoom = rooms.find(
    (room) => String(room.id) === String(selectedRoomId),
  );

  const handleSelectRoom = (roomId: string | number) => {
    setSelectedRoomId(roomId);
    setAdminDraft("");
  };

  const handleSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const trimmed = adminDraft.trim();
    if (!trimmed || !selectedRoomId) {
      return;
    }

    setAdminDraft("");

    const { error: insertError } = await supabase.from("chat_messages").insert({
      room_id: selectedRoomId,
      sender_type: "admin",
      sender_name: "Operations",
      message: sanitizeInput(trimmed),
    });

    if (insertError) {
      setError("Unable to send message.");
    }
  };

  return (
    <section
      className="admin-card admin-chat-card"
      aria-label="Admin live chat"
    >
      <div className="admin-chat-header">
        <div>
          <h2>Live chat queue</h2>
          <p>Respond directly to visitor messages right from the dashboard.</p>
        </div>
      </div>

      <div className="admin-chat-grid">
        <aside className="admin-chat-rooms">
          <div className="admin-chat-room-list-header">
            <h3>Recent chat rooms</h3>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => void loadRooms()}
            >
              Refresh
            </button>
          </div>

          {loadingRooms && <div className="chat-status">Loading rooms…</div>}

          {!loadingRooms && rooms.length === 0 && (
            <div className="chat-empty">No active chat rooms yet.</div>
          )}

          <div className="chat-room-list">
            {rooms.map((room) => (
              <button
                key={String(room.id)}
                type="button"
                className={`chat-room-item ${String(room.id) === String(selectedRoomId) ? "active" : ""}`}
                onClick={() => handleSelectRoom(room.id)}
              >
                <span>{room.visitor_name || "Guest"}</span>
                <small>{room.visitor_email || "No email provided"}</small>
                <strong>{formatTimestamp(room.created_at)}</strong>
              </button>
            ))}
          </div>
        </aside>

        <div className="admin-chat-thread">
          {!selectedRoom && (
            <div className="chat-empty">Select a room to view messages.</div>
          )}

          {selectedRoom && (
            <>
              <div className="chat-thread-header">
                <div>
                  <span className="eyebrow">Room</span>
                  <h3>{selectedRoom.visitor_name || "Guest visitor"}</h3>
                  <p>{selectedRoom.visitor_email || "No email supplied"}</p>
                </div>
                <span className={`chat-room-status ${selectedRoom.status}`}>
                  {selectedRoom.status}
                </span>
              </div>

              {error && <div className="alert alert-error">{error}</div>}

              <div className="chat-messages-wrapper admin-thread">
                {loadingMessages && (
                  <div className="chat-status">Loading messages…</div>
                )}
                {!loadingMessages && messages.length === 0 && (
                  <div className="chat-empty">
                    No messages in this room yet.
                  </div>
                )}
                <div className="chat-messages">
                  {messages.map((item) => (
                    <div
                      key={String(item.id)}
                      className={`chat-message ${item.sender_type === "visitor" ? "visitor" : "admin"}`}
                    >
                      <div className="chat-message-content">
                        <p>{item.message}</p>
                        <span>
                          {item.sender_type === "visitor"
                            ? item.sender_name || "Visitor"
                            : "You"}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <form className="live-chat-form" onSubmit={handleSend}>
                <label
                  className="screen-reader-only"
                  htmlFor="adminChatMessage"
                >
                  Reply message
                </label>
                <textarea
                  id="adminChatMessage"
                  value={adminDraft}
                  onChange={(event) => setAdminDraft(event.target.value)}
                  placeholder="Write a response..."
                  rows={3}
                />
                <button className="btn btn-primary" type="submit">
                  Send reply
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
