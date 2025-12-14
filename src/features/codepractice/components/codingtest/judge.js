// codepractice/codingtest/judge.js

/**
 * 단일 테스트 실행 (Run 버튼)
 */
export function runUserCode(userCode, input) {
  try {
    const wrappedCode = `
      ${userCode}
      return solution(${JSON.stringify(input)});
    `;

    const fn = new Function(wrappedCode);
    const result = fn();

    return {
      success: true,
      output: String(result),
    };
  } catch (e) {
    return {
      success: false,
      error: e.message,
    };
  }
}

/**
 * 전체 테스트 실행 (Submit 버튼)
 */
export function judgeAll(userCode, testCases) {
  return testCases.map((tc, index) => {
    const result = runUserCode(userCode, tc.input);

    if (!result.success) {
      return {
        index,
        input: tc.input,
        pass: false,
        error: result.error,
      };
    }

    return {
      index,
      input: tc.input,
      expected: tc.output,
      actual: result.output,
      pass: result.output === tc.output,
    };
  });
}

export function judgeJS(userCode, testCases) {
  const results = [];

  try {
    // solution 함수 생성
    const fn = new Function(`
      ${userCode}
      return solution;
    `)();

    for (let i = 0; i < testCases.length; i++) {
      const { input, output } = testCases[i];

      let result;
      try {
        result = fn(input);
      } catch (e) {
        results.push({
          index: i + 1,
          input,
          expected: output,
          result: "Runtime Error",
          pass: false,
        });
        continue;
      }

      results.push({
        index: i + 1,
        input,
        expected: output,
        result,
        pass: Object.is(result, output),
      });
    }
  } catch (e) {
    return {
      error: "컴파일 에러",
      results: [],
    };
  }

  return { results };
}