// 공지사항 목록 + 공지창 open/close 상태 담당

import { API_BASE } from "./constants";

export const createNoticeSlice = (set, get) => ({
  // 공지 목록
  notices: [],

  // 공지창 열림 여부
  showNotice: false,

  // 공지 목록 불러오기
  fetchNotices: async () => {
    try {
      const res = await fetch(`${API_BASE}/api/notices`);
      const data = await res.json();
      set({ notices: data });
    } catch (err) {
      console.error("공지사항 불러오기 실패:", err);
    }
  },

  // 공지창 토글 (열릴 때만 서버에서 한번 불러옴)
  toggleNotice: async () => {
    const { showNotice } = get();
    if (!showNotice) {
      // 공지창이 닫혀있다가 열릴 때만 fetch
      await get().fetchNotices();
    }
    set({ showNotice: !showNotice });
  },
});
