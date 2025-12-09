// 위에서 정의한 CSS 모듈을 가져와 스타일을 적용합니다.
import styles from './SnapshotPanel.module.css';

/**
 * 스냅샷 목록을 보여주는 패널 UI 컴포넌트입니다.
 *
 * @param {Array} props.snapshots - 렌더링할 스냅샷 데이터 목록
 * @param {number|null} props.selectedId - 현재 선택된 스냅샷의 식별 번호
 * @param {Function} props.onSelect - 아이템 클릭 시 실행될 부모 함수
 * @param {Function} props.onRestore - 복원 버튼 클릭 시 실행될 부모 함수
 * @param {boolean} props.showRestoreButton - 복원 버튼 표시 여부
 */
const SnapshotPanel = ({
                           snapshots,
                           selectedId,
                           onSelect,
                           onRestore,
                           showRestoreButton
                       }) => {

    // 데이터가 없을 경우 안내 문구를 표시합니다.
    if (!snapshots || snapshots.length === 0) {
        return <div className={styles.container}>저장된 스냅샷이 없습니다.</div>;
    }
    return (
        <div className={styles.container}>
            {snapshots.map((snapshot) => {
                // 기본 아이템 스타일 클래스를 변수에 할당합니다.
                let itemClass = styles.item;

                // 현재 아이템이 선택된 상태라면 active 클래스를 추가합니다.
                if (selectedId === snapshot.id) {
                    itemClass = `${styles.item} ${styles.active}`;
                }

                return (
                    <div
                        key={snapshot.id}
                        className={itemClass}
                        onClick={() => onSelect(snapshot)}
                    >
                        <span className={styles.name}>
                            {snapshot.name}
                        </span>
                        <span className={styles.time}>
                            {snapshot.createdAt}
                        </span>

                        {/* showRestoreButton이 true일 때만 복원 버튼을 렌더링합니다. */}
                        {showRestoreButton && (
                            <button
                                className={styles.restoreButton}
                                onClick={(e) => {
                                    // 상위 요소로의 클릭 이벤트 전파를 중단합니다.
                                    e.stopPropagation();
                                    onRestore(snapshot);
                                }}
                            >
                                복원
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default SnapshotPanel;