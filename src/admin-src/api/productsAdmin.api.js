import { BASE_URL, API } from "./constants.api";
export const productsAdminApi = {
  getProductList: (page = 1, limit = 12, filter = {}, textSearch) => {
    const paginationString = `_page=${page}&_limit=${limit}`;

    const filterString = Object.keys(filter)
      // eslint-disable-next-line array-callback-return
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
  postNewProduct: (data) => API.post(`${BASE_URL}/api/products`, data),
  editProduct: (id, data) => API.patch(`${BASE_URL}/api/products`, id, data),
  deleteProduct: (id) => API.delete(`${BASE_URL}/api/products`, id)
};
