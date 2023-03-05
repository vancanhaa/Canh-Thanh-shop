import { API, BASE_URL } from "./constants.api";

export const orderApi = {
    getOrder: (idUser) => API.get(`${BASE_URL}/api/orders?id_user=${idUser}`),
    postOrder: (data) => API.post(`${BASE_URL}/api/orders`, data),
    deleteOrder: (idOrder) => API.delete(`${BASE_URL}/api/orders`, idOrder),
    getOrderDetail: (idOrder) => API.get(`${BASE_URL}/api/orders/${idOrder}`) 

}