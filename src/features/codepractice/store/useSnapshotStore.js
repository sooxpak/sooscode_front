import { create } from "zustand";
import { usePracticeStore } from "./usePracticeStore";
import { buildHCJ, parseHCJ } from "../utils/parseHCJ.js";
import { saveSnapshot } from "/src/features/codepractice/services/snapshot/snapshot.api.js"

export const useSnapshotStore = create((set, get) => ({
  
  snapshots: [],             // 스냅샷 목록
  selectedSnapshot: null,    // 선택된 스냅샷
  addSnapshot: (item) =>
    set((state) => ({
      snapshots: [...state.snapshots, item],
    })),

  setSelectedSnapshot: (item) =>
    set({ selectedSnapshot: item }),

  clearSnapshots: () =>
    set({ snapshots: [], selectedSnapshot: null }),

  refreshKey: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshKey: state.refreshKey + 1 })),
  
  // HCJ 전용 save store
  saveHCJSnapshot: async (title) => {
  const { htmlCode, cssCode, jsCode} =
    usePracticeStore.getState();

  const fullHTML = buildHCJ({
    html: htmlCode,
    css: cssCode,
    js: jsCode,
  });
  

  await saveSnapshot({
    title,
    content: fullHTML,
    language: "CSS_HTML_JS",
    classId: 1,
  });

  get().triggerRefresh();
  },

  snapshotHTML: "",
  snapshotCSS: "",
  snapshotJS: "",

  // HCJ Load Store Method
  loadSelectedHCJSnapshot: (snapshot) => {
  if (!snapshot?.content) {
    console.warn("HCJ 로드 스킵: content 없음", snapshot);
    return;
  }

  if (snapshot.language !== "CSS_HTML_JS") return;

  const { html, css, js } = parseHCJ(snapshot.content);

  set({
    snapshotHTML: html,
    snapshotCSS: css,
    snapshotJS: js,
  });
},


  resetSnapshots: () =>
  set({
    snapshots: [],
    selectedSnapshot: null,
  }),


  
}));
