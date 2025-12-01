import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginForm from "./features/auth/components/LoginForm";
import MyPage from "./pages/MyPage";
import SocialSuccess from "./pages/SocialSuccess";
import SignupForm from "./features/auth/components/SignupForm";
import  "./assets/global.css";
import authApi from "@/features/auth/services/authApi.js";


function App() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLogin(!!token);
    }, []);

    const onLogout = async () => {
        try {
            await authApi.post("/api/auth/logout");
        } catch (e) {
            console.log("로그아웃 API 실패");
        }

        localStorage.removeItem("accessToken");
        setIsLogin(false);
        navigate("/");
    };

    return (
        <BrowserRouter>
            {isLogin ? (
                <button variant="outlined" color="error" onClick={onLogout}>
                    로그아웃
                </button>
            ) : (
                <Link to="/login">
                    <button variant="contained">로그인</button>
                </Link>
            )}
            <Routes>
                <Route path="/login" element={<LoginForm setIsLogin={setIsLogin} />} />
                <Route path="/join" element={<SignupForm setIsLogin={setIsLogin} />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/social-success" element={<SocialSuccess />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
