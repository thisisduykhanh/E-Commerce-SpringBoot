import apiClient from "./ApiClient";

export const createProduct = async (
	formData,
  ) => {
	try {
	  const response = await apiClient.post('/products', formData, {
		headers: {
		  'Content-Type': 'multipart/form-data',
		},
	  });

	  return response;
	} catch (error) {
	  throw error;
	}
  };


export const getUsers = async (page = 0, size = 10) => {
  try {
    const response = await apiClient.get(`/users?page=${page}&size=${size}`);
    return response; // This will return the entire response object
  } catch (error) {
    console.error('Error fetching products:', error);
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

export const getMyOrder1 = async (status, page, size) => {
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
