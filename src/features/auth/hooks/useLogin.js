import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/hooks/useToast";
import { handleAuthError} from "@/features/auth/hooks/useEmail.js";

const useLogin = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();
    const toast = useToast();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await api.post(
                "/api/auth/login",
                { email, password },
                { withCredentials: true }
            );

            setUser(response.data);
            toast.success(response.data.message);
            navigate("/");
        }
        catch (err) {
            const errorCode = err.response?.data?.code;

            const msg = handleAuthError(errorCode, {
                emailRef,
                passwordRef,
            });

            if (msg) {
                setError(msg);
                toast.error(msg);
                return;
            }

            console.log(msg)
            setError("로그인에 실패했습니다.");
            toast.error("로그인에 실패했습니다.");
        }

        finally {
            setLoading(false);
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        loading, error,
        onSubmit,
        emailRef, passwordRef,
    };
};

export default useLogin;
