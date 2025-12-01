import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes";

// pages
import LoginPage from "../pages/login/LoginPage.jsx";

import StudentMyPage from "../pages/student/StudentMyPage.jsx";
import StudentClassOnline from "../pages/student/StudentClassOnline.jsx";
import StudentClassOffline from "../pages/student/StudentClassOffline.jsx";
import StudentClassDetail from "../pages/student/StudentClassDetail.jsx";

import TeacherMyPage from "../pages/teacher/TeacherMyPage.jsx";
import TeacherClassOnline from "../pages/teacher/TeacherClassOnline.jsx";
import TeacherClassOffline from "../pages/teacher/TeacherClassOffline.jsx";
import TeacherClassDetail from "../pages/teacher/TeacherClassDetail.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

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
