// src/features/mypage/services/mypageService.js
import { api } from "@/services/api"; // 공용 axios instance
import { useQuery } from "@tanstack/react-query";

// 서버 요청: GET /api/classroom/me/classes
export const getMyClasses = async (page = 0, size = 10) => {
  const res = await api.get("/api/classroom/me/classes", {
    params: { page, size },
  });
  return res.data;
};

// React Query 훅
export const useMyClasses = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ["myClasses", page, size],
    queryFn: () => getMyClasses(page, size),
    staleTime: 60 * 1000,
  });
};
