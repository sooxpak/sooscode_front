export const ROUTES = {
  LOGIN: "/login",

  STUDENT: {
    MYPAGE: "/student/mypage",
    ONLINECLASS: (id = ":id") => `/student/class/${id}/online`,
    OFFLINECLASS: (id = ":id") => `/student/class/${id}/offline`,
    CLASS_DETAIL: (id = ":id") => `/student/class/${id}/detail`,
  },

  TEACHER: {
    MYPAGE: "/teacher/mypage",
    ONLINECLASS: (id = ":id") => `/teacher/class/${id}/online`,
    OFFLINECLASS: (id = ":id") => `/teacher/class/${id}/offline`,
    CLASS_DETAIL: (id = ":id") => `/teacher/class/${id}/detail`,
  },
};
