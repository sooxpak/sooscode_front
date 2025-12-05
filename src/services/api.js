// services/api.js
import axios from "axios";
import { ROUTES } from "../constants/routes";

export const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

// Request 인터셉터 - 요청 전 처리
api.interceptors.request.use(
    (config) => {
        return config;
    },
    // 요청을 보내기 전 발생하는 에러
    (error) => {
        return Promise.reject(error);
    }
);