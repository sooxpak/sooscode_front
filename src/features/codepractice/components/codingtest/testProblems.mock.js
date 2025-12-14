// codepractice/codingtest/testProblems.mock.js

export const testProblems = [
  {
    id: 1,
    title: "n의 배수",
    difficulty: 1, // 1 ~ 5
    description: `
정수 num과 n이 주어질 때,
num이 n의 배수이면 1을, 아니면 0을 반환하세요.
    `,
    languages: ["js"],

    template: {
      js: `function solution(input) {
  const [num, n] = input.split(" ").map(Number);
  return num % n === 0 ? 1 : 0;
}`
    },

    testCases: [
      { input: "98 2", output: "1" },
      { input: "34 3", output: "0" }
    ]
  },

  {
    id: 2,
    title: "문자열 길이 구하기",
    difficulty: 1,
    description: `
문자열이 주어질 때 문자열의 길이를 반환하세요.
    `,
    languages: ["js"],

    template: {
      js: `function solution(input) {
  return input.length;
}`
    },

    testCases: [
      { input: "hello", output: "5" },
      { input: "abcde", output: "5" }
    ]
  }
];
