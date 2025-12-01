// src/components/ChatMessages.jsx
import { useEffect, useRef } from "react";
import useChatStore from "../store/chatStore";

function ChatMessages() {
  const chatRef = useRef(null);

  // 상태
  const showNotice = useChatStore((s) => s.showNotice);
  const notices = useChatStore((s) => s.notices);
  const currentRoom = useChatStore((s) => s.currentRoom);
  const messages = useChatStore((s) => s.messages);
  const reactions = useChatStore((s) => s.reactions);
  const nickname = useChatStore((s) => s.nickname);

  // 액션 / 유틸
  const likeMessage = useChatStore((s) => s.likeMessage);
  const formatTime = useChatStore((s) => s.formatTime);
  const formatDateTime = useChatStore((s) => s.formatDateTime);

  // 메시지 바뀔 때마다 아래로 스크롤
  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, showNotice]);

  return (
    <div className="chat-messages" ref={chatRef}>
      {showNotice ? (
        notices.length === 0 ? (
          <div className="notice-empty">등록된 공지사항이 없습니다.</div>
        ) : (
          <div className="notice-list">
            {notices.map((n) => (
              <div key={n.id} className="notice-item">
                <div className="notice-title">{n.title}</div>
                <div className="notice-content">{n.content}</div>
                <div className="notice-time">
                  {formatDateTime(n.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )
      ) : !currentRoom ? (
        <div className="notice-empty">
          현재 접속 가능한 채팅방이 없습니다. 관리자에게 문의해 주세요.
        </div>
      ) : (
        messages.map((m, i) => {
          const reaction = reactions[m.id] || {
            likeCount: 0,
            reactors: [],
          };

          return (
            <div
              key={m.id ?? i}
              className={
                m.sender === nickname ? "message user" : "message agent"
              }
            >
              <div className="message-sender">{m.sender}</div>
              <div>{m.text}</div>
              <div className="message-time">
                {formatTime(m.createdAt)}
              </div>

              {/* 좋아요 */}
              <div className="reaction-row">
                <button
                  type="button"
                  className="like-btn"
                  onClick={() => likeMessage(m.id)}
                >
                  ❤️ 좋아요 ({reaction.likeCount ?? 0})
                </button>
                {reaction.reactors?.length > 0 && (
                  <div className="reactor-list">
                    {reaction.reactors.join(", ")} 님이 좋아합니다
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ChatMessages;
