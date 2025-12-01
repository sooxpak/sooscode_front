// src/features/chat/chatting.jsx (예시)

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useChatStore from "./store/chatStore";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import "./App.css"

function Chatting() {
  const { classId } = useParams(); // --> 지금 classId가 undefined임
  console.log(classId,"**************")

  const setCurrentClassId = useChatStore((s) => s.setCurrentClassId);
  const connect = useChatStore((s) => s.connect);
  const disconnect = useChatStore((s) => s.disconnect);
  const initNickname = useChatStore((s) => s.initNickname);
  const nickname = useChatStore((s) => s.nickname);
  const fetchHistory = useChatStore((s) => s.fetchHistory);

  // 닉네임 없으면 guest-랜덤
  useEffect(() => {
    if (!nickname) {
      initNickname("guest-" + Math.floor(Math.random() * 10000));
    }
  }, [nickname, initNickname]);

  // URL에서 받은 classId -> store에 세팅 + 히스토리 로딩
  useEffect(() => {
    if (classId) {
      const numericId = Number(classId);
      setCurrentClassId(numericId);
      fetchHistory(numericId)
    }
  }, [classId, setCurrentClassId]);

  // 웹소켓 연결
  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return (
    <div className="user-support-chat-container">
      <div className="chat-box">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  );
}

export default Chatting;
