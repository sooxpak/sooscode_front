// ResultModal.jsx
import { useCodeTestStore } from "../../store/useCodeTestStore";
import styles from "./ResultModal.module.css";

export default function ResultModal() {
  const { passed, showResultModal, closeResultModal } =
    useCodeTestStore();

  if (!showResultModal) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {passed ? (
          <h2 className={styles.pass}>정답입니다!</h2>
        ) : (
          <h2 className={styles.fail}>틀렸습니다</h2>
        )}

        <button onClick={closeResultModal}>
          확인
        </button>
      </div>
    </div>
  );
}
