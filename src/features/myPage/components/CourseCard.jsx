import styles from "./CourseCard.module.css";

export default function CourseCard({ image, title, instructor }) {
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseImageWrapper}>
        <img className={styles.courseImage} src={image} alt={title} />
      </div>

      <div className={styles.courseInfo}>
        <h3 className={styles.courseTitle}>{title}</h3>
        <p className={styles.courseInstructor}>{instructor}</p>
        <div className={styles.courseSpacer} />
      </div>
    </div>
  );
}
