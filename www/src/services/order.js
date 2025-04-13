import apiClient from './ApiClient';

export const addOrder = async (fullName, address, phone, shippingFee, taxFee, cartDetailIds) => {
    try {
        const response = await apiClient.post('/orders', { fullName, address, phone, shippingFee, taxFee, cartDetailIds });
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

export const updateOrderStatus = async (idOrder, idStatus) => {
    try {
        const response = await apiClient.put(`/orders?idOrder=${idOrder}&idStatus=${idStatus}`);
        return response;
    } catch (error) {
        throw error;
    }
}


export const paymentOrder = async (orderId, paymentMethod) => {
    try {
        const response = await apiClient.post(`/orders/${orderId}/pay?method=${paymentMethod}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateOrderViewed = async (id) => {
    try {
        const response = await apiClient.patch(`/orders/viewed/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}


export const getOrderSupply = async () => {
    try {
        const response = await apiClient.get(
            `/orders`
        );

        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get my order details 
 * @returns {Promise<axios.AxiosResponse<any>>} - The response from the API
 */
export const getMyOrder = async () => {
    try {
        const response = await apiClient.get(`/orders/myOrders`);
        return response;
    } catch (error) {
        throw error;
    }
};
// 1 accept 2 pending 3 completed

/**
 * 
 * @param {Number} id  - The ID of the order to retrieve
 * @returns {Promise<axios.AxiosResponse<any>>} - The response from the API
 * @throws {Error} - If the request fails
 */
export const getOrderDetail = async (id) => {
    try {
        const response = await apiClient.get(`/orders/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}