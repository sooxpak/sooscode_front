// src/features/chat/components/ChatInput.jsx

import useChatStore from "../store/chatStore";

function ChatInput() {
  const input = useChatStore((s) => s.input);
  const setInput = useChatStore((s) => s.setInput);
  const showNotice = useChatStore((s) => s.showNotice);
  const currentClassId = useChatStore((s) => s.currentClassId);
  const sendMessage = useChatStore((s) => s.sendMessage);

  const handleSend = () => {
    sendMessage();
  };

  return (
    <div className="chat-input">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder={
          currentClassId
            ? `${currentClassId}번 수업 채팅에 메시지를 입력하세요`
            : "접속 가능한 채팅방이 없습니다"
        }
        disabled={showNotice || !currentClassId}
      />
      <button
        onClick={handleSend}
        disabled={showNotice || !currentClassId}
      >
        보내기
      </button>
    </div>
  );
}

export default ChatInput;
