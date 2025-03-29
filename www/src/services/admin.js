import apiClient from './ApiClient';
export const getProduct = async (status, page, size) => {
    const response = await apiClient.get(
        `admin/product/getListByStatusVerify?page=${page}&size=${size}&productVerifyStatus=${status}`
    );
    return response;
};

export const getSupplier = async (status,page , size) => {
    const response = await apiClient.get(`admin/supplier?verifyStatus=${status}&page=${page}&size=${size}`);
    return response;
};
export const getUser = async (page , size) => {
    const response = await apiClient.get(`admin/user?page=${page}&size=${size}`);
    return response;
};
export const getChat = async () => {
    const response = await apiClient.get(`groups/sorted`);
    return response;
};
export const getListChat = async (id) => {
    const response = await apiClient.get(`groups?id=${id}`);
    return response;
};

