import useChatStore from "../store/chatStore";

function ChatMessages() {
  const messages = useChatStore((s) => s.messages);

  return (
    <div className="chat-messages">
      {messages.length === 0 && (
        <div style={{ color: "#999" }}>메시지가 없습니다.</div>
      )}

      {messages.map((msg) => (
        <div key={msg.chatId} className="chat-message">
          <div className="sender">{msg.user?.name ?? "익명"}</div>
          <div className="content">{msg.content}</div>
          <div className="time">
            {msg.createdAt?.replace("T", " ").slice(0, 19)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
