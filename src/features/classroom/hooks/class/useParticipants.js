// features/classroom/hooks/participants/useParticipants.js

import { useState, useEffect } from 'react';
import { useSocketContext } from '@/features/classroom/contexts/SocketContext';

/**
 * 실시간 참가자 목록 관리 훅
 */
export const useParticipants = (classId) => {
    const [participants, setParticipants] = useState([]);
    const socket = useSocketContext();

    useEffect(() => {
        if (!socket || !socket.connected || !classId) return;

        // 참가자 목록 구독
        const topic = `/topic/class/${classId}/participants`;

        const subscription = socket.subscribe(topic, (data) => {
            console.log('[useParticipants] 참가자 목록 수신:', data);

            if (data && data.participant) {
                setParticipants(data.participant);
            }
        });

        // 초기 참가자 목록 요청
        const requestTopic = `/app/class/${classId}/participants`;
        socket.publish(requestTopic, {});

        return () => {
            if (subscription) {
                subscription.unsubscribe();
                console.log('[useParticipants] 구독 해제');
            }
        };
    }, [socket, socket?.connected, classId]);

    // 강사/학생 필터링
    const instructors = participants.filter(p => p.role === 'INSTRUCTOR');
    const students = participants.filter(p => p.role === 'STUDENT');

    return {
        participants,
        instructors,
        students,
        totalCount: participants.length,
        studentCount: students.length,
        instructorCount: instructors.length,
    };
};