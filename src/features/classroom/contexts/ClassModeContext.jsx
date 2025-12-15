import { createContext, useContext, useState, useEffect } from 'react';
import { useSocketContext } from './SocketContext';

// 수업 모드 타입
export const CLASS_MODES = {
  VIEW_ONLY: 'VIEW_ONLY',       // 읽기 전용
  FREE_PRACTICE: 'FREE_PRACTICE', // 자유 실습
  QUIZ: 'QUIZ'                   // 퀴즈 모드
};

const ClassModeContext = createContext(null);

export const ClassModeProvider = ({ children, classId }) => {
  const [mode, setMode] = useState(CLASS_MODES.FREE_PRACTICE);
  const socket = useSocketContext();

  // 소켓으로 모드 변경 수신
  useEffect(() => {
    if (!socket || !classId) return;

    const subscription = socket.subscribe(
      `/topic/mode/${classId}`,
      (message) => {
        const data = JSON.parse(message.body);
        setMode(data.mode);
      }
    );

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [socket, classId]);

  // 모드 변경 함수 (강사만 호출하도록 나중에 권한 체크 추가)
  const changeMode = (newMode) => {
    if (!socket || !classId) return;

    try {
      socket.publish(`/app/mode/${classId}`, {
        mode: newMode,
        timestamp: new Date().toISOString()
      });
      setMode(newMode);
    } catch (error) {
      console.error('모드 변경 실패:', error);
    }
  };

  return (
    <ClassModeContext.Provider value={{ mode, changeMode }}>
      {children}
    </ClassModeContext.Provider>
  );
};

export const useClassMode = () => {
  const context = useContext(ClassModeContext);
  if (!context) {
    throw new Error('useClassMode must be used within ClassModeProvider');
  }
  return context;
};