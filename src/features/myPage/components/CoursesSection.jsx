import styles from "./CoursesSection.module.css";
import CourseCard from "./CourseCard";

import img1 from "../../../assets/images/myPage/picture.png";
import img2 from "../../../assets/images/myPage/picture.png";
import img3 from "../../../assets/images/myPage/picture.png";
import img4 from "../../../assets/images/myPage/picture.png";

export default function CoursesSection() {
  const courses = [
    { image: img1, title: "React 완벽 가이드", instructor: "김철수" },
    { image: img2, title: "TypeScript 마스터하기", instructor: "이영희" },
    { image: img3, title: "Next.js 심화 과정", instructor: "정지원" },
    { image: img4, title: "UI/UX 디자인 기초", instructor: "정지원" },
  ];

  return (
    <section className={styles.coursesSection}>
      <h2 className={styles.coursesTitle}>내 강의</h2>

      <div className={styles.coursesGrid}>
        {courses.map((c, i) => (
          <CourseCard key={i} {...c} />
        ))}
      </div>
    </section>
  );
}
