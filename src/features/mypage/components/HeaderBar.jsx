import styles from "./HeaderBar.module.css";

export default function HeaderBar() {
  return (
    <div className={styles.header}>
      <div className={styles.left}>/SoosCode/</div>
      <div className={styles.center}>마이페이지</div>
      <div className={styles.right}></div>
    </div>
  );
}
