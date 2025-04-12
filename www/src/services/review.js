import apiClient from './ApiClient';

export const addReview = async (review) => {
    try {

        const response = await apiClient.post('/reviews', review);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getReviews = async (productCode) => {
    try {
        const response = await apiClient.get(`/reviews/product/${productCode}`);
        return response;
    } catch (error) {
        throw error;
    }
}
