import apiClient from './ApiClient';

export const addOrder = async (fullname, address, phone, idCartDetail,shippingFee,taxFee,city,district) => {
    try {
        const response = await apiClient.post('/orders', { fullname, address, phone, idCartDetail,shippingFee,taxFee,city,district});
        return response;
    } catch (error) {
        throw error;
    }
};

export const getCartDetail = async () => {
    try {
        const response = await apiClient.get('/cart');
        return response;
    } catch (error) {
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

export const getMyOrder = async (status,page,size) => {
    try {
        const response = await apiClient.get(`/users/orders?orderStatus=${status}&page=${page}&size=${size}`);
        return response;
    } catch (error) {
        throw error;
    }
};
// 1 accept 2 pending 3 completed
