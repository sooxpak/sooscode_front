// src/features/chat/store/roomSlice.js (경로는 네 프로젝트에 맞게)
// 방 목록 X, 그냥 현재 수업 ID(classId)만 관리

export const createRoomSlice = (set, get) => ({
  // ✅ 현재 접속한 수업의 classId (문자열로 저장)
  currentClassId: null,

  // ✅ 현재 수업 변경 (URL에서 받은 classId를 여기로 넣어 주는 용도)
  setCurrentClassId: (classId) => {
    const idStr = String(classId);
    set({ currentClassId: idStr });

    // 수업 바뀌면 그 수업 히스토리 다시 로딩
    get().fetchHistory(idStr);
  },

  // ✅ 더 이상 방 목록은 안 씀
  rooms: [],
});
