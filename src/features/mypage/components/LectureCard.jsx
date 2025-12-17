import { useNavigate } from "react-router-dom";
import styles from "./LectureCard.module.css";
import defaultImg from "@/assets/img1.jpg";
import { encode } from "@/utils/urlEncoder";

export default function LectureCard({
  thumbnail,
  title,
  teacher,
  onClick,
  isOnAir = false,
  classId,
  imageUrl,
}) {
  const navigate = useNavigate();

  const handleJoinClass = (classId) => {
    const encoded = encode(classId);
    console.log("encoded:", encoded);
  console.log("current:", window.location.pathname);
    navigate(`/class/${encoded}`); // ← /class/MTIz
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.thumbnailWrapper}
        onClick={onClick}   // ← hover 상태에서 클릭 시 강의 상세 이동
      >
        <img
          className={styles.thumbnail}
          src={imageUrl || defaultImg}
          alt={title}
        />

        <div className={styles.hoverOverlay}>
          <span className={styles.overlayText}>
            강의 상세 보기
          </span>
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.teacher}>{teacher}</p>
      </div>

      <div className={styles.buttonBox}>
        <button
          className={`${styles.detailButton} ${
            !isOnAir ? styles.disabledButton : ""
          }`}
          disabled={!isOnAir}
          onClick={() => handleJoinClass(classId)}
        >
          강의실 입장
        </button>
      </div>
    </div>
  );
}
