import styles from "./FileItem.module.css";

export default function FileItem({ file }) {
  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <span className={styles.icon}>📄</span>
        <div className={styles.info}>
          <div className={styles.name}>{file.name}</div>
          <div className={styles.date}>{file.date}</div>
        </div>
      </div>
    </div>
  );
}
