// src/App.jsx
import React, { useEffect} from "react";
import "./App.css";
import useChatStore from "./store/chatStore";
import ChatHeader from "./components/ChatHeader";
import SelectRoom from "./components/SelectRoom";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";

function App({ nickname: initialNickname }) {

  // ====== 상태 selector들 ======
  const nickname = useChatStore((s) => s.nickname);



  // ====== 액션 selector들 ======
  const initNickname = useChatStore((s) => s.initNickname);
  const fetchRooms = useChatStore((s) => s.fetchRooms);
  const connect = useChatStore((s) => s.connect);
  const disconnect = useChatStore((s) => s.disconnect);


  // 1) 닉네임 초기화
  useEffect(() => {
    if (!initialNickname) return;
    initNickname(initialNickname);
  }, [initialNickname, initNickname]);

  // 2) 닉네임 준비되면 방 목록 불러오기
  useEffect(() => {
    if (!nickname) return;
    fetchRooms();
  }, [nickname, fetchRooms]);

  // 3) 자동 WebSocket 연결
  useEffect(() => {
    if (!nickname) return;

    connect();

    return () => {
      disconnect();
    };
  }, [nickname, connect, disconnect]);

  return (
    <div className="user-support-chat-container">
      <div className="chat-box">

      {/* 상단 헤더 */}
        <ChatHeader/>
        
      {/* 방선택이랑 닉네임표시*/ }
      <SelectRoom/>

      {/*  메시지 / 공지 영역 */}
      <ChatMessages/>
        

        {/*  입력창 (connected 의존 완전 제거) */}
        <ChatInput/>

      </div>
    </div>
  );
}

export default App;
