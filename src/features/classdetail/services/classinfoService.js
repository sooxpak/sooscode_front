// src/features/classdetail/services/classInfoService.js

import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

/**
 * 단일 ClassRoom 정보 조회 API
 * GET /api/classroom/{classId}
 */
export const fetchClassInfo = async (classId) => {
  const res = await api.get(`/api/classroom/${classId}`);
  return res.data; // ResponseEntity.ok(payload)
};

export const useClassInfo = (classId) => {
  return useQuery({
    queryKey: ["classInfo", classId],
    queryFn: () => fetchClassInfo(classId),
    enabled: !!classId, // classId 없으면 요청 안 함
    retry: 0,
  });
};
