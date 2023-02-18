import { BASE_URL, API } from "./constants.api";

export const productsApi = {
  getAllProductList: (page, limit) =>
    API.get(`${BASE_URL}/api/products?_page=${page}&_limit=${limit}`),
  getCategoryProductList: (page, limit, category) =>
    API.get(
      `${BASE_URL}/api/products?category=${category}&_page=${page}&_limit=${limit}`
    ),
};
