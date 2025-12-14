import { useState } from "react";
import styles from "./ProblemSelect.module.css";
import { useCodeTestStore } from "../../store/useCodeTestStore";
import { testProblems } from "./testProblems.mock";

export default function ProblemSelect() {
  const [open, setOpen] = useState(false);

  const problem = useCodeTestStore((s) => s.problem);
  const setProblem = useCodeTestStore((s) => s.setProblem);

  const handleSelect = (p) => {
    setProblem(p);
    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
      >
        {problem.title}
        <span className={styles.arrow}>▾</span>
      </button>

      {open && (
        <div className={styles.dropdown}>
          {testProblems.map((p) => (
            <div
              key={p.id}
              className={styles.item}
              onClick={() => handleSelect(p)}
            >
              <div className={styles.itemTitle}>{p.title}</div>
              <div className={styles.meta}>
                {p.level} · {p.category}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
