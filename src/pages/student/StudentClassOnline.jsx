import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import styles from "./StudentClassOnline.module.css";
import StudentOnlineClass from "../../features/class/online/student/components/StudentOnlineClass";

export default function StudentClassPage() {
  const { id } = useParams();
  const roomId = `class-${id}`; // 강의 ID 기반 방 이름
  const serverUrl = "wss://sooscode-alv59aqj.livekit.cloud";

  const [token, setToken] = useState("");

  // TODO: 로그인 상태에서 nickname 가져오기
  const nickname = "student123";

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await fetch("http://localhost:8080/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            room: roomId,
            identity: nickname,
          }),
        });

        const data = await res.json();
        setToken(data.token);
      } catch (err) {
        console.error("토큰 발급 실패:", err);
      }
    }

    fetchToken();
  }, [id]);

  if (!token) return <div>강의방 입장 준비 중...</div>;

  return (
    // <LiveKitRoom
    //   token={token}
    //   serverUrl={serverUrl}
    //   connect={true}
    //   video={true}
    //   audio={true}
    // >
    //   <VideoConference />
    // </LiveKitRoom>
    
    <div className={styles.app}>
      <StudentOnlineClass />
    </div>
  );
}
