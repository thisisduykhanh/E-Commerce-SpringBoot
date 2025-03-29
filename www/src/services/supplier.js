import apiClient from './ApiClient';
export const getProduct = async (status, page, size) => {
    const response = await apiClient.get(`supplier/products?page=${page}&size=${size}&productVerifyStatus=${status}`);
    return response;
};
export const getProductGroup = async () => {
    const response = await apiClient.get(`supplier/productGroup`);
    return response;
};
export const getProductType = async (productGroupId) => {
    const response = await apiClient.get(`supplier/productGroup?id=${productGroupId}`);
    return response;
};
export const fetchProduct = async (productGroupId) => {
    const response = await apiClient.get(`users/search/product?id=${productGroupId}`);
    return response;
};

export const createProduct = async (formData) => {
    try {
        const response = await apiClient.post('supplier/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};
export const getOrderSupply = async (orderStatus, page = 0, size = 10) => {
    try {
        const response = await apiClient.get(
            `/supplier/orders?OrderStatus=${orderStatus}&page=${page}&size=${size}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};
export const fetchOrderDetail = async (id) => {
    try {
        const response = await apiClient.get(
            `/supplier/orders/getId?id=${id}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};
export const getSupplier = async (id) => {
    try {
        const response = await apiClient.get(
            `/supplier/getCurrentSupplier`
        );
        return response;
    } catch (error) {
        throw error;
    }
};
export const updateOrderStatus = async (orderStatus,idOrder) => {
    try {
        const response = await apiClient.get(
            `/supplier/orders?idOrder=${idOrder}&idStatus=${orderStatus}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};


