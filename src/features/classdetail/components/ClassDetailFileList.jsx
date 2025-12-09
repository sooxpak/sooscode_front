import styles from "./ClassDetailFileList.module.css";
import FileItem from "./FileItem";

export default function ClassDetailFileList({ files = [], onUpload }) {
  return (
    <div className={styles.container}>
      
      {/* 헤더 */}
      <div className={styles.header}>
        <div className={styles.titleBox}>
          <span className={styles.icon}>📁</span>
          <span className={styles.title}>강의 자료</span>
        </div>

        <span className={styles.count}>{files.length}개</span>
      </div>

      {/* 파일 리스트 */}
      <div className={styles.fileList}>
        {files.map((file, idx) => (
          <FileItem key={idx} file={file} />
        ))}
      </div>

      {/* 파일 등록 버튼 */}
      <button className={styles.uploadButton} onClick={onUpload}>
        ⬆ 파일 등록
      </button>
    </div>
  );
}
