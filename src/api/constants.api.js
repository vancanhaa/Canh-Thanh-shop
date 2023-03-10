import axios from "axios";

export const BASE_URL = "http://localhost:3003";

export const API = {
  get: (url) => axios.get(url),
  post: (url, data) => axios.post(url, data),
  patch: (url, id, data) => axios.patch(`${url}/${id}`, data),
  delete: (url, id) => axios.delete(`${url}/${id}`),
};

/*
get
    localhost:3003/product
    localhost:3003/product/12420

post
    localhost:3003/product, payload= {

    }
*/
