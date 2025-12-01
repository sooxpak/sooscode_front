// 메시지 목록, 입력값, 리액션 관련 상태/액션 담당

import { API_BASE, SEND_URL } from "./constants";

export const createMessageSlice = (set, get) => ({
  // 메시지 목록
  messages: [],

  // 입력창 값
  input: "",

  // 메시지별 리액션 정보 { [messageId]: { likeCount, reactors[] } }
  reactions: {},

  // 인풋 변경
  setInput: (value) => set({ input: value }),

  // 특정 메시지 리액션 요약 가져오기
  fetchReactionSummary: async (messageId) => {
    if (!messageId) return;
    try {
      const res = await fetch(
        `${API_BASE}/api/chat/reactions/summary?messageId=${messageId}`
      );
      const data = await res.json(); // { likeCount, reactors }
      set((prev) => ({
        reactions: {
          ...prev.reactions,
          [messageId]: data,
        },
      }));
    } catch (err) {
      console.error("리액션 요약 불러오기 실패:", err);
    }
  },

  // 특정 방의 채팅 히스토리 불러오기
  fetchHistory: async (room) => {
    if (!room) return;
    try {
      const res = await fetch(
        `${API_BASE}/api/chat/history?room=${room}`
      );
      const data = await res.json();
      set({ messages: data });

      // 각 메시지에 대한 리액션 요약 로딩
      data.forEach((m) => {
        if (m.id) {
          get().fetchReactionSummary(m.id);
        }
      });
    } catch (err) {
      console.error("히스토리 불러오기 실패:", err);
    }
  },

  // 메시지 전송
  sendMessage: () => {
    const { client, connected, input, currentRoom, nickname } =
      get();
    if (!client || !connected || !input.trim() || !currentRoom)
      return;

    const msgObj = {
      sender: nickname,
      text: input.trim(),
      room: currentRoom,
    };

    client.publish({
      destination: SEND_URL,
      body: JSON.stringify(msgObj),
    });

    // 전송 후 입력창 비우기
    set({ input: "" });
  },

  // 메시지 좋아요
  likeMessage: async (messageId) => {
    const { nickname } = get();
    if (!messageId) return;
    if (!nickname.trim()) return;

    try {
      await fetch(
        `${API_BASE}/api/chat/reactions/like?messageId=${messageId}&reactor=${encodeURIComponent(
          nickname
        )}`,
        { method: "POST" }
      );
    } catch (err) {
      console.error("좋아요 실패:", err);
    }
  },
});
