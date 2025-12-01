import styles from "./StudentMyPage.module.css";

import Header from "../../components/common/Header";
import ProfileSection from "../../features/myPage/components/ProfileSection";
import CoursesSection from "../../features/myPage/components/CoursesSection";

export default function MyPage() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.mainContent}>
        <ProfileSection styles={styles} />
        <CoursesSection styles={styles} />
      </main>
    </div>
  );
}
