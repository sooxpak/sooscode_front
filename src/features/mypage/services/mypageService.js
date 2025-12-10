// src/features/mypage/services/mypageService.js
import { api } from "@/services/api"; // 공용 axios instance
import { useQuery } from "@tanstack/react-query";

// 서버 요청: GET /api/classroom/me/classes
/*
export const getMyClasses = async (page = 0, size = 10) => {
  const res = await api.get("/api/mypage", {
    params: { page, size },
  });
  return res.data;
};
*/

export const getMyClasses = async () => {
  const res = await api.get("/api/mypage/classes");
  return res.data;   // RestUtils.ok() 구조
};


// React Query 훅
export const useMyClasses = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ["myClasses", page, size],
    queryFn: () => getMyClasses(page, size),
    staleTime: 60 * 1000,
  });
};
