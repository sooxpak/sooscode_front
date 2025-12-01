import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function SocialSuccess() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = params.get("accessToken");
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            navigate("/mypage");
        }
    }, []);

    return <div>로그인 처리중...</div>;
}
export default SocialSuccess;
