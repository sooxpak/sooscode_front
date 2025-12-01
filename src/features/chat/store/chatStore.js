// 여기서 모든 slice를 합쳐서 최종 useChatStore를 만든다.

import { create } from "zustand";
import { createConnectionSlice } from "./connectionSlice";
import { createMessageSlice } from "./messageSlice";
import { createRoomSlice } from "./roomSlice";
import { createNoticeSlice } from "./noticeSlice";
import { createUiSlice } from "./uiSlice";

const useChatStore = create((set, get) => ({
  // 각 슬라이스에서 리턴한 객체들을 하나로 합침
  ...createConnectionSlice(set, get),
  ...createMessageSlice(set, get),
  ...createRoomSlice(set, get),
  ...createNoticeSlice(set, get),
  ...createUiSlice(set, get),
}));

export default useChatStore;
