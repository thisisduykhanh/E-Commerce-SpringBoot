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


/**
 * Fetch products from the API
 * @param {number} page - The page number to fetch
 * @param {number} size - The number of items per page
 * @returns {Promise<axios.AxiosResponse<any>>} - The response from the API
 */
export const getProducts = async (page = 0, size = 10) => {
  try {
    const response = await apiClient.get(`/products?page=${page}&size=${size}`);
    return response; // This will return the entire response object
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetch a specific product by ID
 * @param {number} id - The ID of the product to fetch
 * @returns {Promise<axios.AxiosResponse<any>>} - The response from the API
 */
export const getProduct = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response;
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
export const getProductsByType = async (type, page = 0, size = 10) => {
	try {
		const response = await apiClient.get(
			`/products/by-type/${type}?page=${page}&size=${size}`,
		);
		return response;
	} catch (error) {
		throw error;
	}
}


/**
 * Delete a product by ID (Soft Delete).
 * @param {number} id - The ID of the product to delete.
 * @returns {Promise<axios.AxiosResponse<any>>} - The response from the API.
 */
export const deleteProduct = async (id) => {
	try {
	  const response = await apiClient.delete(`/products/${id}`);
	  return response; // This will return the response object
	} catch (error) {
	  console.error('Error deleting product:', error);
	  throw error;
	}
  };