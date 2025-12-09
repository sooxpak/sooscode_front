import styles from "./CodeModal.module.css";

export default function CodeModal({ open, onClose, title, code }) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않게
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <pre className={styles.codeBlock}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
