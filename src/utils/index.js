import router from "@/router";
import axios from "axios";

const api = axios.create({
    baseURL: "https://api.example.com",
    headers: {
        "Content-Type": "application/json"
    }
});

// Thêm interceptor để tự động gắn token vào header
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export function fileToBase64(file, includeMime = false) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error("File không hợp lệ"));
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result;
            if (includeMime) {
                resolve(base64String); // Giữ nguyên cả MIME type
            } else {
                resolve(base64String.split(",")[1]); // Chỉ lấy phần base64
            }
        };
        reader.onerror = (error) => reject(error);
    });
}

export const updateQueryParams = (newParams) => {
    console.log("router", router);
    const currentRoute = router.currentRoute.value;
    const updatedQuery = { ...currentRoute.query, ...newParams };
    // Loại bỏ các param có giá trị null hoặc rỗng
    Object.keys(updatedQuery).forEach((key) => {
        if (updatedQuery[key] === null || updatedQuery[key] === "") {
            delete updatedQuery[key];
        }
    });
    // Thay đổi query params
    router.push({ path: currentRoute.path, query: updatedQuery });
    // router.replace({ path: currentRoute.path, query: updatedQuery });
};

export const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
}

export default api;