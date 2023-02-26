import { API, BASE_URL } from "./constants.api";

export const cartsApi = {
    getCart: (idUser) => API.get(`${BASE_URL}/api/carts/${idUser}`),
    patchCart: (idUser, products) => API.patch(`${BASE_URL}/api/carts`,idUser, products),
    addNewCart: (data) => API.post(`${BASE_URL}/api/carts`, data)

} 