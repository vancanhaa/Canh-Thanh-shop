import { BASE_URL, API } from "./constants.api";

export const productsApi = {
  getProductList: (page, limit) =>
    API.get(`${BASE_URL}/products?_page=${page}&_limit=${limit}`),
};
