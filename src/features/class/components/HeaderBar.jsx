import styles from "./HeaderBar.module.css";

export default function HeaderBar() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img
          src="/favicon.ico"
          alt="icon"
          className={styles.icon}
        />
        <span className={styles.title}>JAVA FULLSTACK 12기 | AI</span>
      </div>

      <button className={styles.chatButton}>
        💬 채팅
      </button>
    </header>
  );
}
