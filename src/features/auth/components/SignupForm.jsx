import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import auth from "./AuthForm.module.css";
import styles from "./SignupForm.module.css";
import {FiLock, FiMail, FiUser} from "react-icons/fi";

//import googleIcon from "@/assets/icons/google.svg";
//import logoImg from "@/assets/logo/logo.png";

function SignupForm() {
    const [form, setForm] = useState({name: "", email: "", password: "", confirmPassword: "",});
    const [errors, setErrors] = useState({});
    const [verified, setVerified] = useState(false);
    const [code, setCode] = useState("");
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [sendLoading, setSendLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
        if (name === "password") checkPasswordStrength(value);
    };

    const checkPasswordStrength = (pw) => {
        let score = 0;
        if (pw.length >= 8) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        if (score <= 1) setPasswordStrength("약함"); else if (score === 2) setPasswordStrength("보통"); else setPasswordStrength("강함");
    };

    const validate = () => {
        let newErrors = {};
        if (form.email.length < 5 || form.email.length > 100) newErrors.email = "이메일은 5~100자"; else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "이메일 형식 오류";
        if (form.password.length < 8 || form.password.length > 20) newErrors.password = "비밀번호 8~20자";
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = "비밀번호 불일치";
        if (form.name.length < 2 || form.name.length > 20) newErrors.name = "이름은 2~20자";
        if (!verified) newErrors.emailVerify = "이메일 인증 필요";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const startTimer = (sec) => {
        if (intervalId) clearInterval(intervalId);
        setTimer(sec);
        const id = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(id);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        setIntervalId(id);
    };

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? "0" + s : s}`;
    };

    const sendCode = async () => {
        if (!form.email) return alert("이메일 입력 필요");
        try {
            setSendLoading(true);
            await axios.post("http://localhost:8080/api/auth/email/send", {email: form.email,});
            alert("인증코드 전송 완료");
            setShowCodeInput(true);
            startTimer(180);
        } catch {
            alert("전송 실패");
        } finally {
            setSendLoading(false);
        }
    };

    const verifyCode = async () => {
        try {
            const {data} = await axios.post("http://localhost:8080/api/auth/email/verify", {email: form.email, code});
            if (data.verified) {
                alert("인증 성공!");
                setVerified(true);
                clearInterval(intervalId);
                setTimer(0);
            } else alert("잘못된 코드");
        } catch {
            alert("인증 오류");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            await axios.post("http://localhost:8080/api/auth/register", {
                email: form.email,
                password: form.password,
                name: form.name,
            });
            alert("회원가입 성공");
            navigate("/login");
        } catch {
            alert("회원가입 실패");
        }
    };

    return (
        <div className={auth.background}>
            <div className={auth.card}>
                {/*<img src={logoImg} className={auth.logo} />*/}

                <h2 className={auth.title}>회원가입</h2>
                <p className={auth.subtitle}>새로운 계정을 만들어보세요.</p>

                <form className={auth.form} onSubmit={handleSubmit}>
                    <div>
                        <label className={auth.label}>이름</label>
                        <div className={auth.inputWrapper}>
                            <FiUser className={auth.inputIcon}/>
                            <input
                                className={auth.input}
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p className={styles.error}>{errors.name}</p>}
                        </div>
                    </div>

                    <div>
                        <label className={auth.label}>이메일</label>
                        <div className={auth.inputWrapper}>
                            <FiMail className={auth.inputIcon}/>
                            <div className={styles.row}>
                                <input
                                    className={auth.input}
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className={styles.subButton}
                                    onClick={sendCode}
                                    disabled={timer > 0}
                                >
                                    {sendLoading ? "전송중" : "인증"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {showCodeInput && (
                            <>
                                <div className={styles.row}>
                                    <input
                                        className={`${auth.input} ${styles.nopadding}`}
                                        placeholder="인증코드 입력"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                    <div className={styles.row}>
                                        <button
                                            type="button"
                                            className={styles.outlineButton}
                                            onClick={verifyCode}
                                            disabled={timer === 0}
                                        >
                                            확인
                                        </button>
                                    </div>
                                </div>
                                {timer > 0 && (
                                    <span className={styles.timer}>{formatTime(timer)}</span>
                                )}
                                {errors.emailVerify && (
                                    <p className={styles.error}>{errors.emailVerify}</p>
                                )}
                            </>
                        )}
                    </div>
                    <div>
                        <label className={auth.label}>비밀번호</label>
                        <div className={auth.inputWrapper}>
                            <FiLock className={auth.inputIcon}/>
                            <input
                                className={auth.input}
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                        {form.password && (
                            <p
                                className={
                                    passwordStrength === "강함"
                                        ? styles.strong
                                        : passwordStrength === "보통"
                                            ? styles.medium
                                            : styles.weak
                                }
                            >
                                비밀번호 강도: {passwordStrength}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className={auth.label}>비밀번호 확인</label>
                        <div className={auth.inputWrapper}>
                            <FiLock className={auth.inputIcon}/>
                            <input
                                className={auth.input}
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && (
                                <p className={styles.error}>{errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>
                    <button className={auth.primaryButton} disabled={!verified}>
                        회원가입
                    </button>
                    <p className={auth.footerText}>
                        이미 계정이 있으신가요? <Link className={styles.link} to="/login">로그인</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
export default SignupForm