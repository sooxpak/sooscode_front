import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import LoginPage from "../pages/login/LoginPage.jsx";

import StudentMyPage from "../pages/student/StudentMyPage.jsx";
import StudentClassPage from "../pages/student/StudentClassPage.jsx";
import StudentClassDetailPage from "../pages/student/StudentClassDetailPage.jsx";

import TeacherMyPage from "../pages/teacher/TeacherMyPage.jsx";
import TeacherClassPage from "../pages/teacher/TeacherClassPage.jsx";
import TeacherClassDetailPage from "../pages/teacher/TeacherClassDetailPage.jsx";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />

        {/* Student */}
        <Route path="/student/mypage" element={<StudentMyPage />} />
        <Route path="/student/class/:id" element={<StudentClassPage />} />
        <Route path="/student/class/:id/detail" element={<StudentClassDetailPage />} />

        {/* Teacher */}
        <Route path="/teacher/mypage" element={<TeacherMyPage />} />
        <Route path="/teacher/class/:id" element={<TeacherClassPage />} />
        <Route path="/teacher/class/:id/detail" element={<TeacherClassDetailPage />} />

      </Routes>
    </BrowserRouter>
  );
}
