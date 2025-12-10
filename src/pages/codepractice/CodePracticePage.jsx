import styles from "./CodePracticePage.module.css";
import CodePracticeHeader from "@/features/codepractice/layout/CodePracticeHeader";
import CodePracticeSidebar from "@/features/codepractice/layout/CodePracticeSidebar";
import CodePracticeSection from "@/features/codepractice/layout/CodePracticeSection";
import { usePracticeUIStore } from "../../features/codepractice/store/usePracticeUIStore";


export default function CodePracticePage() {
  const { isSidebarOpen } = usePracticeUIStore();
  
  return (
    
    <div className={styles.PageWrapper}>
      <CodePracticeHeader />

      <div className={styles.ContentWrapper}>
        {isSidebarOpen && <CodePracticeSidebar />}
        <CodePracticeSection />
      </div>
    </div>
  );
}
