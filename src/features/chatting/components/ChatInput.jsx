import useChatStore from "../store/chatStore";

function ChatInput() {
  // Zustand에서 필요한 상태/액션 꺼내오기
  const input = useChatStore((s) => s.input);
  const setInput = useChatStore((s) => s.setInput);
  const showNotice = useChatStore((s) => s.showNotice);
  const currentRoom = useChatStore((s) => s.currentRoom);
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
          currentRoom
            ? `${currentRoom}번 방에 메시지를 입력하세요`
            : "접속 가능한 채팅방이 없습니다"
        }
        // 공지 모드거나, 방이 없으면 입력 비활성화
        disabled={showNotice || !currentRoom}
      />
      <button
        onClick={handleSend}
        disabled={showNotice || !currentRoom}
      >
        보내기
      </button>
    </div>
  );
}

export default ChatInput;
