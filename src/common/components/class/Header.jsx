import svgPaths from "./svg-m8gkxzjjeu";
import styles from "./Header.module.css";

export default function Header({ onChatToggle }) {
  return (
    <header className={styles.navigationBar}>
      <div className={styles.navigationBarContent}>

        {/* Left Section */}
        <div className={styles.leftSection}>
          <div className={styles.logoContainer}>
            <div className={styles.logoInner}>
              <div className={styles.iconWrapper}>
                <div className={styles.iconVector1}>
                  <div className={styles.iconVectorInner}>
                    <svg className={styles.svg} fill="none" viewBox="0 0 6 10">
                      <path d="M1 9L5 5L1 1" stroke="white" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className={styles.iconVector2}>
                  <div className={styles.iconVectorInner}>
                    <svg className={styles.svg} fill="none" viewBox="0 0 6 10">
                      <path d="M5 1L1 5L5 9" stroke="white" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className={styles.iconVector3}>
                  <div className={styles.iconVectorInner}>
                    <svg className={styles.svg} fill="none" viewBox="0 0 7 18">
                      <path d={svgPaths.p3dc5ba80} stroke="white" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className={styles.textContainer}>
            <div className={styles.textContent}>
              <p className={styles.heading}>JAVA FULLSTACK 12기 AI</p>
              
            </div>
          </div>
        </div>

        {/* Chat Button */}
        <div className={styles.chatButton} onClick={onChatToggle}>
          <div className={styles.buttonContent}>
            <div className={styles.buttonIcon}>
              <svg className={styles.svg} fill="none" viewBox="0 0 20 20">
                <path
                  d={svgPaths.p12dcd500}
                  stroke="#B9BBBE"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <button className={styles.buttonText}>
              <p className={styles.buttonTextContent}>채팅</p>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
