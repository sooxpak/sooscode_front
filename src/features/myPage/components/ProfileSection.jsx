import styles from "./ProfileSection.module.css";
import imgImageWithFallback from "../../../assets/images/myPage/picture.png";

export default function ProfileSection() {
  return (
    <section className={styles.profileSection}>
      <div className={styles.profileGradient} />

      <div className={styles.profileContent}>
        <div className={styles.profileImageWrapper}>
          <div className={styles.profileImageContainer}>
            <img
              className={styles.profileImage}
              src={imgImageWithFallback}
              alt="프로필 이미지"
            />
          </div>
        </div>

        <div className={styles.profileInfo}>
          <div className={styles.profileCard}>
            <div className={styles.profileField}>
              <p className={styles.fieldLabel}>사용자명</p>
              <p className={styles.fieldValue}>홍길동</p>
            </div>

            <div className={styles.profileField}>
              <p className={styles.fieldLabel}>이메일</p>
              <p className={`${styles.fieldValue} ${styles.fieldValueEmail}`}>
                hongkildong@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
