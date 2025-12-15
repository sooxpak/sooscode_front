import { useClassMode, CLASS_MODES } from '@/features/classroom/contexts/ClassModeContext';
import styles from './ModeToggleBar.module.css';

const ModeToggleBar = () => {
    const { mode, changeMode } = useClassMode();

    const getModeLabel = (modeType) => {
        switch (modeType) {
            case CLASS_MODES.VIEW_ONLY:
                return '읽기 전용';
            case CLASS_MODES.FREE_PRACTICE:
                return '자유 실습';
            case CLASS_MODES.QUIZ:
                return '퀴즈 모드';
            default:
                return '';
        }
    };

    const getModeIcon = (modeType) => {
        switch (modeType) {
            case CLASS_MODES.VIEW_ONLY:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                );
            case CLASS_MODES.FREE_PRACTICE:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20h9"/>
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                    </svg>
                );
            case CLASS_MODES.QUIZ:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <path d="M12 17h.01"/>
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.label}>수업 모드</div>
            <div className={styles.buttons}>
                {Object.values(CLASS_MODES).map((modeType) => (
                    <button
                        key={modeType}
                        className={`${styles.button} ${mode === modeType ? styles.active : ''}`}
                        onClick={() => changeMode(modeType)}
                        disabled={modeType === CLASS_MODES.QUIZ}
                    >
                        <span className={styles.icon}>{getModeIcon(modeType)}</span>
                        <span className={styles.text}>{getModeLabel(modeType)}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ModeToggleBar;