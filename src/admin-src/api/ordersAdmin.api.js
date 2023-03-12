import { BASE_URL, API } from "./constants.api";
export const ordersAdminApi = {
    getOrdersList: (page = 1, limit = 12) => {
        return API.get(`${BASE_URL}/api/orders?_page=${page}&_limit=${limit}`)
    },

    getOrderDetail: (id) => {
        return API.get(`${BASE_URL}/api/orders/${id}`)
    },
    deleteOrder: (id) => API.delete(`${BASE_URL}/api/orders`, id),
    getAllOrders: () => API.get(`${BASE_URL}/api/orders`)
}