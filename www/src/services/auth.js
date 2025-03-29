import { logger } from '@/lib/default-logger';
import apiClient from './ApiClient';

// API đăng nhập
export const login = async (email, password) => {
    const response = await apiClient.post('/accounts/signin', { email, password });
    return response;
};

// API đăng ký
export const register = async (fullname, phone, email, password) => {
    const response = await apiClient.post('/users', { fullname, phone, email, password });
    return response;
};

// API lấy thông tin người dùng
export const getUser = async () => {
    const response = await apiClient.get('/users/getCurrentUser');
    logger.debug('User:', response);
    return response;
};

/**
 * Get seller
 *
 * @export getSeller
 * @async @returns {Promise<unknown>}
 * @returns {Promise<unknown>}
 */
export async function getSeller() {
    try {
        const response = await apiClient.get('/users/getSupplier', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (_error) {
        throw new Error('Failed to fetch seller data');
    }
}

// API cập nhật thông tin người dùng
export const updateUser = async (params) => {
    const response = await apiClient.put('/users/me', params);
    return response;
};

// API đăng kí tài khoản của người bán
export const registerSeller = async (formData) => {
    const response = await apiClient.post('/supplier', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
};
