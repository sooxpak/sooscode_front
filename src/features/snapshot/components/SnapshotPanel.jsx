import { useState } from "react";
import styles from "../styles/SnapshotPanel.module.css";
import { useSnapshot } from "@/features/snapshot/hooks/useSnapshot";
import SnapshotModal from "./SnapshotModal";
import { useToast } from "@/hooks/useToast";

// [Props 설명]
// currentCode: 현재 에디터에 적힌 코드 (저장할 때 사용)
// onRestore: 리스트에서 '불러오기' 눌렀을 때 실행할 함수 (부모의 코드를 바꿈)
export default function SnapshotPanel({ currentCode, onRestore }) {

    // 훅 기능 사용 (목록 조회, 저장 함수, 로딩 상태)
    const { snapshots, createSnapshot, isLoading } = useSnapshot();
    const toast = useToast();

    // 모달 상태 (패널 내부에서 관리)
    const [isModalOpen, setModalOpen] = useState(false);

    // [버튼 클릭] 저장하기
    const handleSaveClick = () => {
        if (!currentCode || !currentCode.trim()) {
            toast.warning("저장할 코드가 없습니다.");
            return;
        }
        setModalOpen(true);
    };

    // [모달] 저장 확정
    const handleModalConfirm = async (title) => {
        const success = await createSnapshot(title, currentCode);
        if (success) {
            setModalOpen(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* 1. 상단: 저장 버튼 */}
            <div className={styles.header}>
                <button
                    className={styles.saveButton}
                    onClick={handleSaveClick}
                    disabled={isLoading}
                >
                    {isLoading ? "저장 중..." : "+ 현재 코드 스냅샷 저장"}
                </button>
            </div>

            {/* 2. 하단: 스냅샷 리스트 */}
            {(!snapshots || snapshots.length === 0) ? (
                <div className={styles.empty}>저장된 스냅샷이 없습니다.</div>
            ) : (
                snapshots.map((snapshot) => (
                    <div key={snapshot.id} className={styles.item}>
                        <div className={styles.info}>
                            <span className={styles.name}>{snapshot.name}</span>
                            <span className={styles.time}>{snapshot.createdAt}</span>
                        </div>
                        <button
                            className={styles.restoreButton}
                            onClick={() => onRestore(snapshot)}
                        >
                            불러오기
                        </button>
                    </div>
                ))
            )}

            {/* 3. 모달 (패널 내장) */}
            <SnapshotModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleModalConfirm}
                isLoading={isLoading}
            />
        </div>
    );
}