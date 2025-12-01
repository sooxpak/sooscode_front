export const routes = {
  public: [
    {
      path: "/login",
      element: <LoginPage />,
    },
  ],

  student: [
    {
      path: "/student/mypage",
      element: <StudentMyPage />,
    },
    {
      path: "/student/class",
      element: <StudentClassPage />,
    },
    {
      path: "/student/class/:id",
      element: <StudentClassDetailPage />,
    },
  ],

  teacher: [
    {
      path: "/teacher/mypage",
      element: <TeacherMyPage />,
    },
    {
      path: "/teacher/class",
      element: <TeacherClass />,
    },
    {
      path: "/teacher/class/:id",
      element: <TeacherClassDetailPage />,
    },
  ],
};
