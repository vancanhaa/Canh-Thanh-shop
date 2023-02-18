import { createAsyncThunk } from "@reduxjs/toolkit";
import { productsApi } from "../../api";

export const fetchAllProductList = createAsyncThunk(
  "product/fetchAllProductList",
  async (payload, thunkApi) => {
    const { page, limit } = payload;

    const response = await productsApi.getAllProductList(page, limit);

    console.log(response.headers["x-total-count"]);
    console.log(response)

    return {
      products: response.data,
      total: response.headers["x-total-count"],
    };
  }
)

export const fetchCategoryProductList = createAsyncThunk(
  "product/fetchCategoryProductList",
  async (payload, thunkApi) => {
    const { page, limit, category } = payload;
    const response = await productsApi.getCategoryProductList(page, limit, category);
    return {
      products: response.data,
      total: response.headers["x-total-count"],
      category: category
    };
  }
)
