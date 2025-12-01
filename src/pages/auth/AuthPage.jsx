import LoginForm from "@/features/auth/layout/LoginForm";
import RegisterForm from "@/features/auth/layout/RegisterForm";
import {useEffect, useState} from "react";

export default function AuthPage({ mode }) {

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLogin(!!token);
    }, []);

    return (
        <>
            {mode === "login" && <LoginForm setIsLogin={setIsLogin}/>}
            {mode === "register" && <RegisterForm />}
        </>
    );
}