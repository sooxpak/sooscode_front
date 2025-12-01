// import { useEffect, useState } from "react";
// import { LiveKitRoom, VideoConference } from "@livekit/components-react";
// import { useParams } from "react-router-dom";

// export default function TeacherClassPage() {
//   const { id } = useParams(); // 방 번호
//   const [token, setToken] = useState("");
//   const serverUrl = "wss://sooscode-alv59aqj.livekit.cloud"; // LiveKit cloud URL

//   useEffect(() => {
//     async function fetchToken() {
//       try {
//         const res = await fetch("http://localhost:8080/token", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             room: id,           // 방 번호 그대로 토큰에 적용
//             identity: "teacher1"  // 선생님 ID(로그인 기반이면 로그인 정보 사용)
//           }),
//         });

//         const data = await res.json();
//         setToken(data.token);   // token 저장
//       } catch (err) {
//         console.error("Token fetch error:", err);
//       }
//     }

//     fetchToken();
//   }, [id]);

//   if (!token) return <div>토큰 발급 중...</div>;

//   return (
//     <LiveKitRoom
//       token={token}
//       serverUrl={serverUrl}
//       connect={true}
//       video={true}
//       audio={true}
//     >
//       <VideoConference />
//     </LiveKitRoom>
//   );
// }

export default function TeacherClassPage() {
  return (
    <div>TeacherClassPage</div>
  );
}
