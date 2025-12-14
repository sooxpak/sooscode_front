import ProblemSelect from "./ProblemSelect";
import styles from "./TestHeader.module.css";

export default function TestHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.header}>
      <ProblemSelect />
    </div>
    </header>
  );
}
