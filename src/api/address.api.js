import { API, BASE_URL } from "./constants.api";

export const addressApi = {
    getListProvinces: () => API.get(`${BASE_URL}/api/provinces`),
    getListDistricts: (province_code) => API.get(`${BASE_URL}/api/districts?province_code=${province_code}`),
    getListWards: (district_code) =>  API.get(`${BASE_URL}/api/wards?district_code=${district_code}`),
    patchAddress: (id, list_address) => API.patch(`${BASE_URL}/api/address`, id, list_address),
    createAddress: (data) => API.post(`${BASE_URL}/api/address`, data),
    getAddress: (id) => API.get(`${BASE_URL}/api/address/${id}`)
}