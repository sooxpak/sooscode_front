import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import authApi from "@/features/auth/services/authApi";
import auth from "./AuthForm.module.css";
import {FiLock, FiMail} from "react-icons/fi";
// import googleIcon from "@/assets/icons/google.svg";
// import logoImg from "@/assets/logo/logo.png";

function LoginForm({setIsLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await authApi.post("/api/auth/login", {email, password});
            localStorage.setItem("accessToken", res.data.accessToken);
            setIsLogin(true);
            navigate("/mypage");
        } catch {
            alert("로그인 실패");
        }
    };

    return (
        <div className={auth.background}>
            <div className={auth.card}>
                {/*<img className={auth.logo} src={logoImg} />*/}

                <h2 className={auth.title}>로그인</h2>
                <p className={auth.subtitle}>온라인 클래스에 오신 것을 환영합니다.</p>
                <form className={auth.form} onSubmit={onSubmit}>
                    <div>
                        <label className={auth.label}>이메일</label>
                        <div className={auth.inputWrapper}>
                            <FiMail className={auth.inputIcon}/>
                            <input
                                className={auth.input}
                                placeholder="email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className={auth.label}>비밀번호</label>
                        <div className={auth.inputWrapper}>
                            <FiLock className={auth.inputIcon}/>
                            <input
                                className={auth.input}
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className={auth.primaryButton}>로그인</button>
                    <div className={auth.dividerArea}>
                        <div className={auth.line}></div>
                        <span className={auth.orText}>또는</span>
                        <div className={auth.line}></div>
                    </div>
                    <button
                        type="button"
                        className={auth.googleButton}
                        onClick={() => window.location.href = "http://localhost:8080/api/auth/google/login"}
                    >
                        {/*<img src={googleIcon} className={auth.googleIcon} />*/}
                        Google로 계속하기
                    </button>
                    <p className={auth.footerText}>
                        계정이 없으신가요? <Link className={auth.link} to="/join">회원가입</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
export default LoginForm