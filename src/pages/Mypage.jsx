import { useEffect, useState } from "react";
import authApi from "@/features/auth/services/authApi";

function MyPage() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        authApi
            .get("/api/user/profile")
            .then((res) => setProfile(res.data))
            .catch(() => alert("프로필을 불러오지 못했습니다."));
    }, []);

    if (!profile) return <div>로딩중...</div>;

    return (
        <div>
            <h2>마이페이지</h2>
            <p>{profile.username} 님 환영합니다.</p>
        </div>
    );
}
export default MyPage;
