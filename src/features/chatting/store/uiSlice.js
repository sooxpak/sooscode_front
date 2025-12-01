// 닉네임, UI용 유틸 함수들 담당
// (필요하면 여기다가 다른 UI용 상태도 추가 가능)

import { formatTime, formatDateTime } from "./timeUtils";

export const createUiSlice = (set) => ({
  // 현재 사용자 닉네임
  nickname: "",

  // 초기에 닉네임 세팅 (로그인 사용자 이름 등)
  initNickname: (initialNickname) => {
    if (!initialNickname) return;
    set({ nickname: initialNickname });
  },

  // 시간 포맷 유틸을 store를 통해서도 쓸 수 있게 노출
  formatTime,
  formatDateTime,
});
