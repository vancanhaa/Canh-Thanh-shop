import { BASE_URL, API } from "./constants.api";

export const productsApi = {
  getAllProduct: () => API.get(`${BASE_URL}/api/products`),
  getSingleProduct: (id) => API.get(`${BASE_URL}/api/product/${id}`),
  searchProduct: (data) => API.get(`${BASE_URL}/api/products/?q=${data}`),
  addNewProduct: (data) => API.post(`${BASE_URL}/api/products, data`),
  updateProduct: (id, data) =>
    API.patch(`${BASE_URL}/api/products/${id}`, data),
  deleteProduct: (id) => API.delete(`${BASE_URL}/api/product/${id}`),
};
