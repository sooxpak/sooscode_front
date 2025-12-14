import { useState, useEffect } from "react";
import ProblemPanel from "../../features/codepractice/components/codingtest/ProblemPanel";
import TestHeader from "../../features/codepractice/components/codingtest/TestHeader";
import CodeEditorPanel from "../../features/codepractice/components/codingtest/CodeEditorPanel";
import ResultPanel from "../../features/codepractice/components/codingtest/ResultPanel";

import { testProblems } from "@/features/codepractice/components/codingtest/testProblems.mock";
import { runUserCode, judgeAll } from "@/features/codepractice/components/codingtest/judge";

import styles from "./CodeTestPage.module.css";
import ResultModal from "../../features/codepractice/components/codingtest/ResultModal";

export default function CodeTestPage() {
  const [problem, setProblem] = useState(testProblems[0]);
  const [code, setCode] = useState(problem.template.js);
  const [results, setResults] = useState(null);

  // 문제 바뀌면 코드 템플릿 초기화
  useEffect(() => {
    setCode(problem.template.js);
    setResults(null);
  }, [problem]);

  const handleRun = () => {
    const r = runUserCode(code, problem.testCases[0].input);
    setResults([
      {
        index: 0,
        input: problem.testCases[0].input,
        expected: problem.testCases[0].output,
        actual: r.output,
        pass: r.output === problem.testCases[0].output,
        error: r.error,
      },
    ]);
  };

  const handleSubmit = () => {
    const r = judgeAll(code, problem.testCases);
    setResults(r);
  };

  return (
    <div className={styles.CodeTestPage}>
      <header className={styles.header}>
        <TestHeader problem={problem} />
      </header>

      <div className={styles.main}>
        <section className={styles.problem}>
          <ProblemPanel problem={problem} />
        </section>

        <section className={styles.editor}>
          <CodeEditorPanel
            code={code}
            onChangeCode={setCode}
            onRun={handleRun}
            onSubmit={handleSubmit}
          />
        </section>
      </div>

      <section className={styles.result}>
        <ResultPanel results={results} />
      </section>
      <ResultModal />
    </div>
  );
}
