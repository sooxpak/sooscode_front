import { Outlet } from "react-router-dom";
import styles from "@/pages/auth/AuthPage.module.css";

const AuthLayout = () => {
    return (
        <div className={styles.background}>
            <div className={styles.card}>
                <Outlet />
            </div>
        </div>
    );
}
export default AuthLayout