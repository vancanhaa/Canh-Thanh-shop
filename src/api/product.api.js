import { BASE_URL, API } from "./constants.api";

export const productsApi = {
  getProductList: (page = 1, limit = 12, filter = {}, textSearch) => {
    const paginationString = `_page=${page}&_limit=${limit}`;

    const filterString = Object.keys(filter)
      .map((key) => {
        if (filter[key] && filter !== "") return `${key}=${filter[key]}`;
      })
      .join("&");

    const textSearchString =
      textSearch && textSearch !== "" ? `&q=${textSearch}` : "";

    const queryString = [
      paginationString,
      ...(textSearchString !== "" ? [textSearchString] : []),
      ...(filterString !== "" ? [filterString] : []),
    ].join("&");

    return API.get(`${BASE_URL}/api/products?${queryString}`);
  },
  getProductDetail: (id) => API.get(`${BASE_URL}/api/products/${id}`),
  getAllProduct: () => API.get(`${BASE_URL}/api/products`),
};
