import { API, BASE_URL } from "./constants.api";

export const authApi = {
    login: (data) => API.post(`${BASE_URL}/api/auth/login`, data),
    register: (data) => API.post(`${BASE_URL}/api/auth/register`, data),

}
