import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, // URL của API
    timeout: 10000, // Thời gian timeout khi không nhận được phản hồi
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Thêm token vào headers nếu có
apiClient.interceptors.request.use(
    (config) => {
        // Trước khi gửi request, bạn có thể thêm token vào headers nếu cần
        // Ví dụ, bạn có thể lấy token từ localStorage hoặc state
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Xử lý lỗi request
        return Promise.reject(error);
    }
);

// Thêm xử lý cho response trả về
apiClient.interceptors.response.use(
    (response) => {
        // Xử lý dữ liệu response, ví dụ như log response
        return response.data; // Trả về dữ liệu response (để bạn dễ sử dụng hơn)
    },
    (error) => {
        // Xử lý lỗi response
        // Bạn có thể thêm logic xử lý lỗi như thông báo cho người dùng nếu API trả về lỗi

        return Promise.reject(error);
    }
);

export default apiClient;
