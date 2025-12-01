import { useState } from "react";
import Header from "../../../../../common/components/class/Header";
import styles from "./StudentOnlineClass.module.css";

export default function StudentOnlineClass() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className={styles.wrapper}>

      <Header onChatToggle={() => setIsChatOpen(!isChatOpen)} />
        <img src="/bruno.png" alt="라이브 비디오 스트림" className={styles.video} />

      {/* 여기! 그리드만 감싸는 contentWrapper 추가 */}
      <div className={`${styles.contentWrapper} ${isChatOpen ? styles.chatOpen : ""}`}>
        <main className={styles.grid}>
          <div className={styles.teacherCode}>강사님 코드 영역</div>
          <div className={styles.myCode}>내 코드 영역</div>
          <div className={styles.teacherOutput}>강사님 출력</div>
          <div className={styles.myOutput}>내 출력</div>
        </main>
      </div>

      <div className={`${styles.chatPanel} ${isChatOpen ? styles.chatOpen : ""}`}>
        <div className={styles.chatHeader}>
          <span>채팅방</span>
          <button onClick={() => setIsChatOpen(false)}>닫기</button>
        </div>

        <div className={styles.chatBody}>
          <p>학생A: 안녕하세요!</p>
        </div>

        <div className={styles.chatInput}>
          <input type="text" placeholder="메시지 입력..." />
          <button>전송</button>
        </div>
      </div>

    </div>
  );
}
