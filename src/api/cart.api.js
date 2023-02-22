import { API, BASE_URL } from "./constants.api";

export const cartsApi = {
    getCart: (idUser) => API.get(`${BASE_URL}/api/carts/${idUser}`)
    
} 