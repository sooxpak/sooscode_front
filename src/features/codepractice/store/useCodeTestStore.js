// features/codepractice/store/useCodeTestStore.js
import { create } from "zustand";
import { runUserCode } from "../components/codingtest/judge";
import { testProblems } from "../components/codingtest/testProblems.mock";

export const useCodeTestStore = create((set, get) => ({
  // ===== 문제 / 코드 =====
  problem: testProblems[0],
  code: testProblems[0].template.js,
  language: "JS",

  // ===== 결과 상태 =====
  passed: null,              // true | false | null
  showResultModal: false,

  // ===== actions =====
  setCode: (code) => set({ code }),

  setProblem: (problem) =>
    set({
      problem,
      code: problem.template.js,
      passed: null,
      showResultModal: false,
    }),

  run: () => {
    const { code, problem } = get();
    const tc = problem.testCases[0];

    const r = runUserCode(code, tc.input);

    const passed =
      !r.error && r.output === tc.output;

    set({
      passed,
      showResultModal: true,
    });
  },

  closeResultModal: () =>
    set({ showResultModal: false }),
}));
