import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import authService from "@/features/auth/services/authService";

// pages

import StudentMyPage from "../pages/student/StudentMyPage.jsx";
import StudentClassOnline from "../pages/student/StudentClassOnline.jsx";
import StudentClassOffline from "../pages/student/StudentClassOffline.jsx";
import StudentClassDetail from "../pages/student/StudentClassDetail.jsx";

import TeacherMyPage from "../pages/teacher/TeacherMyPage.jsx";
import TeacherClassOnline from "../pages/teacher/TeacherClassOnline.jsx";
import TeacherClassOffline from "../pages/teacher/TeacherClassOffline.jsx";
import TeacherClassDetail from "../pages/teacher/TeacherClassDetail.jsx";

import AuthPage from "@/pages/auth/AuthPage.jsx";
import AuthLayout from "@/features/auth/layout/AuthLayout.jsx";
import {useEffect, useState} from "react";

export default function AppRouter() {
    // 추후 Redis도입 시 삭제 될 코드
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLogin(!!token);
    }, []);

  return (
    <BrowserRouter>
      <Routes>
          {/* login & register */}
          <Route element={<AuthLayout setIsLogin={setIsLogin}/>}>
              <Route path="/login" element={<AuthPage setIsLogin={setIsLogin} mode="login"/>}/>
              <Route path="/register" element={<AuthPage mode="register"/>}/>
          </Route>
          {/* Student */}
        <Route path={ROUTES.STUDENT.MYPAGE} element={<StudentMyPage />} />
        <Route path={ROUTES.STUDENT.ONLINECLASS()} element={<StudentClassOnline />} />
        <Route path={ROUTES.STUDENT.OFFLINECLASS()} element={<StudentClassOffline />} />
        <Route path={ROUTES.STUDENT.CLASS_DETAIL()} element={<StudentClassDetail />} />

        {/* Teacher */}
        <Route path={ROUTES.TEACHER.MYPAGE} element={<TeacherMyPage />} />
        <Route path={ROUTES.TEACHER.ONLINECLASS()} element={<TeacherClassOnline />} />
        <Route path={ROUTES.TEACHER.OFFLINECLASS()} element={<TeacherClassOffline />} />
        <Route path={ROUTES.TEACHER.CLASS_DETAIL()} element={<TeacherClassDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
