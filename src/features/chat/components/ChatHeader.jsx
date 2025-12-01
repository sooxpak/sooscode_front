import useChatStore from "../store/chatStore"

function ChatHeader(){
    const client = useChatStore((s) => s.client);
  const currentRoom = useChatStore((s) => s.currentRoom);
  const showNotice = useChatStore((s) => s.showNotice);
  const toggleNotice = useChatStore((s) => s.toggleNotice);
  
  return(
        <div className="chat-header">
          <div>
            <h3>실시간 채팅</h3>
            <div className="chat-agent">
              {client ? "상태: 서버 연결됨" : "상태: 서버 연결중..."}{" "}
              {currentRoom && `| 현재 방: ${currentRoom}번`}
            </div>
          </div>
          <div className="header-right">
            <button
              type="button"
              className="notice-toggle-btn"
              onClick={toggleNotice}
            >
              {showNotice ? "공지 닫기" : "공지 보기"}
            </button>
          </div>
        </div>
          );
}
export default ChatHeader;