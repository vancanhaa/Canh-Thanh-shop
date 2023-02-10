import { BASEURL, API } from "./constants.api"

export const productsApi = {
    getAllProduct: () => API.get(`${BASEURL}/api/products`),
    getSingleProduct: (id) => API.get(`${BASEURL}/api/product/${id}`),
    searchProduct: (data) => API.get(`${BASEURL}/api/products/?q=${data}`),
    addNewProduct: (data) => API.post(`${BASEURL}/api/products, data`),
    updateProduct: (id, data) => API.patch(`${BASEURL}/api/products/${id}`, data),
    deleteProduct: (id) => API.delete(`${BASEURL}/api/product/${id}`),
    
    
}