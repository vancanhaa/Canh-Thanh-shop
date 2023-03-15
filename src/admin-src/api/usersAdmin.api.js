import { BASE_URL, API } from "./constants.api";
export const usersAdminApi = {
    getUsersList: (page = 1, limit = 12) => {
        return API.get(`${BASE_URL}/api/users?_page=${page}&_limit=${limit}`)
    },    
    deleteUser: (id) => API.delete(`${BASE_URL}/api/users`, id),
    getAllUsers: () => API.get(`${BASE_URL}/api/users`),
    changeInfoUser: (id, data) => API.patch(`${BASE_URL}/api/users`, id, data)
}