// features/classroom/components/CodePanel.jsx (리팩토링 버전)

import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import styles from './CodePanel.module.css';
import { useCode } from "@/features/classroom/hooks/code/useCode.js";
import { useMonacoEditor } from "@/features/classroom/hooks/code/useMonacoEditor.js";
import { useCodeExecution } from "@/features/classroom/hooks/code/useCodeExecution.js";
import { getEditorOptions } from "@/features/classroom/utils/editorUtils.js";
import { api } from "@/services/api.js";
import { useSocketContext } from "@/features/classroom/contexts/SocketContext";
import { useClassMode, CLASS_MODES } from "@/features/classroom/contexts/ClassModeContext";
import { useUser } from "@/hooks/useUser.js";

const CodePanel = ({ classId, isInstructor = false }) => {
    const { user } = useUser();
    const { code, setCode } = useCode();
    const { editorInstance, handleEditorMount } = useMonacoEditor();
    const { output, run, copy } = useCodeExecution(code);
    const [lastSavedTime, setLastSavedTime] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const socket = useSocketContext();
    const { mode } = useClassMode();

    const debounceTimerRef = useRef(null);
    const isInitialLoadRef = useRef(true);
    const isSyncingFromInstructor = useRef(false); // 강사로부터 동기화 중 플래그

    // 선생님은 항상 편집 가능, 학생만 읽기 전용 모드의 영향을 받음
    const isReadOnly = !isInstructor && mode === CLASS_MODES.VIEW_ONLY;

    // 읽기 전용 모드 업데이트
    useEffect(() => {
        if (!editorInstance) return;
        editorInstance.updateOptions({
            readOnly: isReadOnly,
            domReadOnly: isReadOnly,
        });
    }, [isReadOnly, editorInstance]);

    // 자동 저장된 코드 로드
    useEffect(() => {
        const loadAutoSavedCode = async () => {
            try {
                const autoSaved = await api.get("/api/code/auto-save", {
                    params: { classId }
                });

                if (autoSaved?.code) {
                    setCode(autoSaved.code);
                }
            } catch (e) {
                console.log("자동 저장 없음");
            } finally {
                setIsLoading(false);
                isInitialLoadRef.current = false;
            }
        };

        if (classId) {
            loadAutoSavedCode();
        }
    }, [classId]);

    //  학생: 강사가 CodeSharePanel에서 편집한 "자기" 코드만 수신
    useEffect(() => {
        if (isInstructor) return; // 강사는 수신 안 함
        if (!socket || !socket.connected) return;

        const instructorTopic = `/topic/code/instructor/${classId}`;
        console.log(`[CodePanel-Student] 강사 편집 코드 구독: ${instructorTopic}`);

        const subscription = socket.subscribe(instructorTopic, (data) => {
            console.log('[CodePanel-Student] 수신:', data);

            if (!data || data.code == null) return;

            //  STUDENT_EDIT 타입이고, 자기를 대상으로 한 편집만 반영
            if (data.type === 'STUDENT_EDIT') {
                // targetEmail이 있으면 자기 이메일과 비교
                if (data.targetEmail && data.targetEmail !== user?.email) {
                    console.log('[CodePanel-Student] 다른 학생 대상 편집 무시:', data.targetEmail);
                    return;
                }

                isSyncingFromInstructor.current = true;
                setCode(data.code);
                setTimeout(() => {
                    isSyncingFromInstructor.current = false;
                }, 0);

                console.log('[CodePanel-Student] 강사 편집 반영 (type: STUDENT_EDIT)');
            } else {
                console.log('[CodePanel-Student] 무시 (type:', data.type, ') - CodeSharePanel에서만 표시');
            }
        });

        return () => {
            if (subscription) {
                subscription.unsubscribe();
                console.log(`[CodePanel-Student] 강사 편집 구독 해제`);
            }
        };
    }, [socket, socket?.connected, classId, isInstructor, setCode, user?.email]);

    // 자동 전송 (디바운스)
    useEffect(() => {
        if (isInitialLoadRef.current || isLoading) return;
        if (!socket || !socket.connected || !classId) return;
        if (isReadOnly) return;

        //  강사로부터 동기화 중이면 전송하지 않음 (무한 루프 방지)
        if (isSyncingFromInstructor.current) {
            console.log('[CodePanel-Student] 강사 동기화 중 - 전송 스킵');
            return;
        }

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            const message = {
                code: code,
                language: 'javascript',
                output: output || null,
                type: isInstructor ? 'INSTRUCTOR_EXAMPLE' : undefined,
                userEmail: user?.email, // 발신자 이메일 추가
            };

            try {
                const endpoint = isInstructor
                    ? `/app/code/instructor/${classId}`
                    : `/app/code/student/${classId}`;

                socket.publish(endpoint, message);
                setLastSavedTime(new Date());

                console.log(`[CodePanel] 코드 전송: ${endpoint}`, message.type);
            } catch (error) {
                console.error('자동 전송 실패:', error);
            }
        }, 300);

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [code, output, socket, classId, isLoading, isReadOnly, isInstructor]);

    const reset = () => {
        if (isReadOnly) return;
        // 리셋 로직
    };

    const options = getEditorOptions(isReadOnly);

    return (
        <PanelGroup direction="vertical" className={`${styles.relative} ${styles.editorWrapper}`}>
            {/* 읽기 전용 배지 */}
            {!isInstructor && isReadOnly && (
                <div className={styles.readOnlyBadge}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    읽기 전용
                </div>
            )}

            {/* 저장 시간 인디케이터 */}
            {lastSavedTime && !isReadOnly && (
                <div className={styles.indigator}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                        <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
                        <path d="M7 3v4a1 1 0 0 0 1 1h7" />
                    </svg>
                    {lastSavedTime.toLocaleTimeString()}
                </div>
            )}

            {/* 에디터 패널 */}
            <Panel defaultSize={70} minSize={30}>
                <Editor
                    language="javascript"
                    value={code}
                    onChange={(value) => setCode(value)}
                    options={options}
                    onMount={handleEditorMount}
                    theme="customTheme"
                    className={styles.editor}
                />
            </Panel>

            {/* 리사이즈 핸들 */}
            <PanelResizeHandle className={styles.verticalResizer}>
                <div className={styles.dotWrap} />
            </PanelResizeHandle>

            {/* 결과 패널 */}
            <Panel defaultSize={30} minSize={15} maxSize={70}>
                <div className={styles.bottomPane}>
                    <div className={styles.resultHeader}>
                        <div className={styles.flex}>
                            <button onClick={run} className={styles.runButton}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                                </svg>
                            </button>
                            <button onClick={reset} className={styles.resetButton} disabled={isReadOnly}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                    <path d="M3 3v5h5" />
                                </svg>
                            </button>
                            <button onClick={copy} className={styles.copyButton}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <pre className={styles.resultOutput}>{output || "결과가 여기에 표시됩니다."}</pre>
                </div>
            </Panel>
        </PanelGroup>
    );
};

export default CodePanel;