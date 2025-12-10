import {
  ChevronLeft,
  PanelLeftOpen, PanelLeftClose,
  PanelRightOpen, PanelRightClose
} from "lucide-react";

import { usePracticeUIStore } from "@/features/codepractice/store/usePracticeUIStore";
import styles from "./CodePracticeHeader.module.css";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function CodePracticeHeader({
  classTitle = "코드 연습",
  onSave,
  onRun
}) {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const {
    isSidebarOpen,
    toggleSidebar,
    isSnapshotOpen,
    toggleSnapshot
  } = usePracticeUIStore();

  return (
    <header className={styles.wrapper}>
      <div className={styles.left}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </button>
        <span className={styles.title}>{classTitle}</span>
      </div>

      <div className={styles.right}>

        {/* 사이드바 토글 */}
        <button className={styles.actionBtn} onClick={toggleSidebar}>
          {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          사이드바
        </button>

        {/* 스냅샷 패널 토글 */}
        <button className={styles.actionBtn} onClick={toggleSnapshot}>
          {isSnapshotOpen ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
          스냅샷
        </button>

        <button className={styles.actionBtn} onClick={onSave}>저장</button>
        <button className={`${styles.actionBtn} ${styles.runBtn}`} onClick={onRun}>
          실행
        </button>
        <button onClick={toggleDarkMode}>
            {darkMode ? "🌙 다크모드" : "☀️ 라이트모드"}
        </button>
      </div>
    </header>
  );
}
