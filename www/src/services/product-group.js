import apiClient from "./ApiClient";

export const addProduct = async (
    productName	,price, description, productTypeId, supplierId, quantity, attributes, images 
) => {
    try {
        const response = await apiClient.post("/products", {
            productName	,price, description, productTypeId, supplierId, quantity, attributes, images
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getGroups = async () => {
    try {
        // const response = await apiClient.get(`/products?page=${page}&size=${size}&status=${status}`);
        const response = await apiClient.get('/product-types');
        // logger.debug('Product groups:', response);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getCartDetail = async () => {
    const response = await apiClient.get("/cart");
    return response;
};

export const getOrderSupply = async (orderStatus, page = 0, size = 10) => {
    try {
        const response = await apiClient.get(
            `/supplier/orders?OrderStatus=${orderStatus}&page=${page}&size=${size}`,
        );

        return response;
    } catch (error) {
        throw error;
    }
};

export const getMyOrder = async (status, page, size) => {
    try {
        const response = await apiClient.get(
            `/users/orders?orderStatus=${status}&page=${page}&size=${size}`,
        );
        return response;
    } catch (error) {
        throw error;
    }
};
// 1 accept 2 pending 3 completed
