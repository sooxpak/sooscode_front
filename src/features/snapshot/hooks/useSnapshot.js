import { create } from "zustand";
import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom"; // [TEST] 테스트용
import { snapshotService } from "../service/snapshotService";
import { useToast } from "@/hooks/useToast";
// import { useClass } from "@/features/classroom/hooks/useClass"; // 기존 훅 (나중에 복구용)


export const useSnapshotStore = create((set) => ({
    snapshots: [],
    setSnapshots: (list) => set({ snapshots: list }),
}));

export function useSnapshot() {
    // [ORIGINAL] 기존 로직 (나중에 실제 연동 시 주석 해제)
    // const { classroom } = useClass();
    // const classId = classroom?.classId;



    // [TEST] 테스트용 로직 (현재 활성화: URL 파라미터 사용)
    const { classId: paramId } = useParams();
    const classId = Number(paramId);
    // ---------------------------------------------------------


    const snapshots = useSnapshotStore((s) => s.snapshots);
    const setSnapshots = useSnapshotStore((s) => s.setSnapshots);

    const toast = useToast();

    // 스냅샷 목록 조회 (useCallback 최적화 적용)
    const fetchSnapshots = useCallback(async () => {
        if (!classId || Number.isNaN(classId)) return;

        try {
            const res = await snapshotService.getAll(classId);
            // API 응답 구조에 따라 content 추출 (안전하게 처리)
            const content = res.content || res.data?.content || [];

            const list = content.map((item) => ({
                id: item.snapshotId,
                name: item.title,
                code: item.content,
                createdAt: new Date(item.createdAt).toLocaleString(),
            }));

            setSnapshots(list);
        } catch (err) {
            console.error(err);
            //toast.error("스냅샷 목록을 불러올 수 없습니다."); // 일단 테스트
        }
    }, [classId, setSnapshots]);

    // 스냅샷 생성
    const createSnapshot = useCallback(async (title, code) => {
        if (!classId) {
            toast.error("클래스 정보가 없습니다.");
            return false;
        }

        try {
            await snapshotService.create({ classId, title, content: code });
            toast.success("스냅샷이 저장되었습니다.");
            await fetchSnapshots();
            return true;
        } catch (err) {
            console.error(err);
            toast.error("저장 실패");
            return false;
        }
    }, [classId, fetchSnapshots, toast]);

    // classId 변경 시 자동 조회
    useEffect(() => {
        if (classId && !Number.isNaN(classId)) {
            fetchSnapshots();
        }
    }, [fetchSnapshots, classId]);

    return {
        snapshots,
        createSnapshot,
        refresh: fetchSnapshots,
    };
}