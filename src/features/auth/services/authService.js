import axios from "axios";

const authService = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    withCredentials: true,
});

authService.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
};

const addSubscriber = (cb) => {
    refreshSubscribers.push(cb);
};

authService.interceptors.response.use(
    (res) => res,
    async (error) => {
        const { config, response } = error;

        if (!response) return Promise.reject(error);
        if (response.status !== 401 || config._retry) return Promise.reject(error);

        config._retry = true;

        if (isRefreshing) {
            return new Promise((resolve) => {
                addSubscriber((token) => {
                    config.headers.Authorization = `Bearer ${token}`;
                    resolve(authService(config));
                });
            });
        }

        isRefreshing = true;

        try {
            const { data } = await authService.post("/api/auth/refresh");
            const newAccessToken = data.accessToken;

            localStorage.setItem("accessToken", newAccessToken);

            authService.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
            isRefreshing = false;
            onRefreshed(newAccessToken);

            config.headers.Authorization = `Bearer ${newAccessToken}`;
            return authService(config);
        } catch (err) {
            isRefreshing = false;
            localStorage.removeItem("accessToken");
            return Promise.reject(err);
        }
    }
);

export default authService;
