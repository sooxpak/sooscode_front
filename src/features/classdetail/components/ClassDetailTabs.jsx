import styles from "./ClassDetailTabs.module.css";

export default function ClassDetailTabs({ active = "snapshot", onChange }) {
  return (
    <div className={styles.tabContainer}>
      <div
        className={`${styles.tab} ${active === "notice" ? styles.active : ""}`}
        onClick={() => onChange("notice")}
      >
        공지사항
      </div>

      <div
        className={`${styles.tab} ${active === "snapshot" ? styles.active : ""}`}
        onClick={() => onChange("snapshot")}
      >
        코드 스냅샷
      </div>
    </div>
  );
}
