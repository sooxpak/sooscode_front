// src/store/roomSlice.js
// 방 목록, 현재 방 설정, 방 전환 관련 상태/액션 담당

import { API_BASE } from "./constants";

export const createRoomSlice = (set, get) => ({
  // 서버에서 받아온 방 목록
  rooms: [],

  // 현재 선택된 방 ID (문자열)
  currentRoom: null,

  // 방 목록 불러오기
  fetchRooms: async () => {
    const { nickname, currentRoom, connected, client } = get();
    if (!nickname) return;

    try {
      const res = await fetch(
        `${API_BASE}/api/chat/rooms?nickname=${encodeURIComponent(
          nickname
        )}`
      );
      const data = await res.json(); // [{id:1,...},...]

      set({ rooms: data });

      // 방이 하나 이상 있고, 현재 선택된 방이 없다면 첫 번째 방으로 설정
      if (data.length > 0 && !currentRoom) {
        const firstRoomId = String(data[0].id);
        set({ currentRoom: firstRoomId });

        // 이미 연결된 상태면 히스토리 + 구독 처리
        if (connected && client) {
          await get().fetchHistory(firstRoomId);
          get().subscribeRoom(client, firstRoomId);
        }
      } else if (data.length === 0) {
        set({ currentRoom: null });
      }
    } catch (err) {
      console.error("방 목록 불러오기 실패:", err);
    }
  },

  // 방 변경
  changeRoom: async (roomId) => {
    const roomStr = String(roomId);

    // 방 변경 시: 현재 메시지 초기화, 공지창 닫기
    set({
      currentRoom: roomStr,
      showNotice: false,
      messages: [],
    });

    const { connected, client } = get();
    if (connected && client) {
      await get().fetchHistory(roomStr);
      get().subscribeRoom(client, roomStr);
    }
  },
});
