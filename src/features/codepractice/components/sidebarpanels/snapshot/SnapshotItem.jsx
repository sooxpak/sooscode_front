import styles from "./SnapshotItem.module.css";
import { formatDate } from "../../../../../utils/date";
import { X } from "lucide-react";
export default function SnapshotItem({ snapshot,onClick ,lang,onDelete}) {

  // 추후 테이블에 language 생성시 컴포넌트 전달
  console.log(lang);
  return (
    <div className={styles.item} onClick={onClick}>
      <div className={styles.title}>
        {snapshot.title}
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(snapshot.codeSnapshotId);
          }}
        >
          <X size={14} />
        </button>
      </div>
      <div className={styles.meta}>
        {formatDate(snapshot.createdAt)}
      </div>
    </div>
  );
}
