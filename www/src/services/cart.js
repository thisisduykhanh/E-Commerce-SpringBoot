import { logger } from '@/lib/default-logger';
import apiClient from './ApiClient';

export const fetchCart = async () => {
    try {
        const response = await apiClient.get('/users/cart');

        if (response && response.data && response.data.cartSupplierDTOS) {
            return response;
        } else {
            throw new Error('Dữ liệu giỏ hàng bị thiếu trong phản hồi');
        }
    } catch (error) {
        logger.error('Lỗi khi lấy giỏ hàng:', error);
        throw error;
    }
};

export const updateCart = async (cartDetailId, quantity) => {
    try {
        const response = await apiClient.patch(`/users/cart?cartDetailId=${cartDetailId}&quantity=${quantity}`);

        return response; // Trả về dữ liệu từ API
    } catch (error) {
        logger.error('There was a problem with the fetch operation:', error);
        throw error; // Ném lỗi để xử lý ngoài hàm
    }
};

export const deleteCart = async () => {
    try {
        const response = await apiClient.delete('/cart');

        return response; // Trả về dữ liệu từ API
    } catch (error) {
        logger.error('There was a problem with the fetch operation:', error);
        throw error; // Ném lỗi để xử lý ngoài hàm
    }
};

// xóa 1 sản phẩm trong giỏ hàng
export const deleteProductInCart = async (productId) => {
    try {
        const response = await apiClient.delete(`/users/cart?cartDetailId=${productId}`);

        return response; // Trả về dữ liệu từ API
    } catch (error) {
        logger.error('There was a problem with the fetch operation:', error);
        throw error; // Ném lỗi để xử lý ngoài hàm
    }
};

export const addToCart = async (productId, quantity) => {
    try {
        const response = await apiClient.post(`/cart?productId=${productId}&quantity=${quantity}`);

        return response; // Trả về dữ liệu từ API
    } catch (error) {
        logger.error('There was a problem with the fetch operation:', error);
        throw error; // Ném lỗi để xử lý ngoài hàm
    }
};
