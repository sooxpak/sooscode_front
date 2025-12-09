import styles from "./LectureCard.module.css";
import defaultImg from "@/assets/img1.jpg";

export default function LectureCard({ thumbnail, title, teacher, onClick }) {
  return (
    <div className={styles.card}>
      <img
        className={styles.thumbnail}
        src={thumbnail || defaultImg}
        alt={title}
      />

      <div className={styles.body}>
        <h3 className={styles.title}>{title || "React 기초강의"}</h3>
        <p className={styles.teacher}>{teacher || "김철수"}</p>
      </div>

      <div className={styles.buttonBox}>
        <button className={styles.detailButton}onClick={onClick}>강의 상세 페이지 이동</button>
      </div>
    </div>
  );
}
