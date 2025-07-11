import { logger } from '@/lib/default-logger';
import apiClient from './ApiClient';

// Hàm lấy danh mục sản phẩm từ API
export const fetchCategories = async () => {
    try {
        const response = await apiClient.get('/product-types');
        return response;
    } catch (error) {
        logger.error('Error fetching categories:', error);
        throw error;
    }
};

// Hàm lấy danh sách loại sản phẩm theo danh mục sản phẩm từ API
export const fetchProductTypes = async (productGroupId) => {
    try {
        const response = await apiClient.get(`/product-types?productGroupId=${productGroupId}`);
        return response;
    } catch (error) {
        logger.error('Error fetching product types:', error);
        throw error;
    }
};

// Hàm lấy danh sách sản phâm theo loại sản phẩm từ API
export const fetchProducts = async (productTypeId) => {
    try {
        const response = await apiClient.get(`/products?productTypeId=${productTypeId}&isProduct=true&minPrice=0`);
        return response;
    } catch (error) {
        logger.error('Error fetching products:', error);
        throw error;
    }
};

// Hàm lấy chi tiết sản phẩm từ API
export const fetchProductDetail = async (productId) => {
    try {
        const response = await apiClient.get(`/products/${productId}`);
        return response;
    } catch (error) {
        logger.error('Error fetching product detail:', error);
        throw error;
    }
};
