import styles from "./ProfileCard.module.css";
import defaultImg from "@/assets/img1.jpg";

export default function ProfileCard({ name, email, imageUrl }) {
  return (
    <div className={styles.profileContainer}>

      {/* 상단 배경 */}
      <div className={styles.profileBackground}></div>

      {/* 프로필 이미지 */}
      <img
        src={imageUrl}
        alt="profile"
        className={styles.profileImage || defaultImg}
      />

      {/* 사용자 정보 섹션 */}
      <div className={styles.profileContentSection}>
        
        <div className={styles.nameContainer}>
          <div className={styles.label}>사용자명</div>
          <div className={styles.value}>{name}</div>
        </div>

        <div className={styles.emailContainer}>
          <div className={styles.label}>이메일</div>
          <div className={styles.value}>{email}</div>
        </div>

      </div>
    </div>
  );
}
