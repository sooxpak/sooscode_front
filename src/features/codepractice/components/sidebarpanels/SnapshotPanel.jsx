import DatePicker from 'react-datepicker';
import styles from './SnapshotPanel.module.css';
import { useEffect, useState } from 'react';
import SnapshotItem from './snapshot/snapshotItem';
import { useSnapshotStore } from '../../store/useSnapshotStore';
import { usePracticeStore } from '../../store/usePracticeStore';
import { getSnapshotDetail, getSnapshotsByLanguageAndDate } from '../../services/snapshot/snapshot.api';
import { formatLocalDate } from '../../../../utils/date';
import { deleteSnapshot } from '../../services/snapshot/snapshot.api';

export default function SnapshotPanel() {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const classId = usePracticeStore((s) => s.classId);
  const [snapshots, setSnapshots] = useState([]);
  const language = usePracticeStore((s) => s.language);
  const selectedSnapshot = useSnapshotStore((s) => s.selectedSnapshot);
  const triggerRefresh = useSnapshotStore((s) => s.triggerRefresh);
  

  // 실질적으로 최초로딩 시 작동하는 쿼리
  const setSelectedSnapshot = useSnapshotStore(
    (state) => state.setSelectedSnapshot
  );

  // HCJ Snapshot
   const loadSelectedHCJSnapshot = useSnapshotStore(
    (state) => state.loadSelectedHCJSnapshot
  );

  // 스냅샷 클릭시 fetch
  const handleClick = async (snapshot) => {
  try {
    // 단건 조회
    const fullSnapshot = await getSnapshotDetail({
      classId,
      snapshotId: snapshot.codeSnapshotId,
    });

    // store에 저장
    setSelectedSnapshot(fullSnapshot);
    console.log(fullSnapshot)

    // HCJ면 에디터 주입
    loadSelectedHCJSnapshot(fullSnapshot);

  } catch (e) {
    console.error("스냅샷 단건 조회 실패", e);
  }
};

  const refreshKey = useSnapshotStore((s) => s.refreshKey);

  const handleDeleteSnapshot = async (snapshotId) => {
  await deleteSnapshot({classId,snapshotId});

  // 선택된 스냅샷 삭제한 경우 초기화
  if (selectedSnapshot?.snapshotId === snapshotId) {
    setSelectedSnapshot(null);
  }

  triggerRefresh(); // 목록 다시 불러오기
};
  

  useEffect(() => {
    // 최초 로딩시 classId null 일때 [] 로 에러 방어
    if (!classId) {
    setSnapshots([]);
    return;
    }
    if (!startDate || !endDate) return;

    const fetchSnapshots = async () => {
      try {
        const result = await getSnapshotsByLanguageAndDate({
          classId,
          language: language,
          startDate: formatLocalDate(startDate),
          endDate: formatLocalDate(endDate),
        });
        setSnapshots(result);
        console.log(result)
      } catch (e) {
        console.error("스냅샷 조회 실패", e);
      }
    };

  fetchSnapshots();
  }, [classId,startDate, endDate, refreshKey,language]);


  return (
    <div>
      <div className={styles.SnapshotPanel}>
        <div className={styles.dateFilterBar}>
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            placeholderText="기간 선택"
            className={styles.dateRangeInput}
          />
        </div>
        <div className={styles.snapshotItemTitle}>
        </div>
        <div className={styles.snapshotItemContainer}>
          {snapshots.length === 0 && (
            <div className={styles.empty}>
              데이터가 없습니다.
            </div>
          )}
          {snapshots.map((snapshot) => (
            <SnapshotItem
              key={snapshot.codeSnapshotId}
              snapshot={snapshot}
              onClick={() => handleClick(snapshot)}
              onDelete={handleDeleteSnapshot}

            />
          ))}
        </div>
      </div>
    </div>
  );
}