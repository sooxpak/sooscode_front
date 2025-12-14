import styles from "./ResultPanel.module.css";
import { useCodeTestStore } from "../../store/useCodeTestStore";

export default function ResultPanel() {
  const results = useCodeTestStore((s) => s.results);

  return (
    <section className={styles.result}>
      <div className={styles.resultHeader}>
        <span className={styles.title}>실행 결과</span>
      </div>

      <div className={styles.resultBody}>
        {!results && (
          <pre className={styles.output}>
실행 결과가 여기에 표시됩니다.
          </pre>
        )}

        {results &&
          results.map((r) => (
            <div
              key={r.index}
              className={`${styles.row} ${
                r.pass ? styles.pass : styles.fail
              }`}
            >
              <div>Test #{r.index + 1}</div>
              <div>입력: {r.input}</div>

              {r.error ? (
                <div className={styles.error}>Error: {r.error}</div>
              ) : (
                <>
                  <div>기대값: {r.expected}</div>
                  <div>결과: {r.actual}</div>
                </>
              )}
            </div>
          ))}
      </div>
    </section>
  );
}
