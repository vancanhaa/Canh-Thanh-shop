import { BASE_URL, API } from "./constants.api";
export const usersAdminApi = {
    getUsersList: (page = 1, limit = 12) => {
        return API.get(`${BASE_URL}/api/users?_page=${page}&_limit=${limit}`)
    },

    getUserDetail: (id) => {
        return API.get(`${BASE_URL}/api/users/${id}`)
    }
}