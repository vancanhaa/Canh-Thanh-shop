import { createAsyncThunk } from "@reduxjs/toolkit";
import { productsApi } from "../../api";

export const fetchProductList = createAsyncThunk(
  "product/fetchProductList",
  async (payload, thunkApi) => {
    const { textSearch, filter, page, limit } = payload;

    const response = await productsApi.getProductList(
      page,
      limit,
      filter,
      textSearch
    );
    return {
      products: response.data,
      textSearch: textSearch,
      filter: filter,
      pagination: {
        page,
        limit,
        total: response.headers["x-total-count"],
      },
    };
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductDetail",
  async (payload, thunkApi) => {
    const response = await productsApi.getProductDetail(payload);
    return {
      product: response.data,
    };
  }
);

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (payload, thunkApi) => {
    const response = await productsApi.getAllProducts()
    return response.data
  }
)

export const addProductRiviewId = createAsyncThunk(
  "product/fetchProductRiviewId",
  async (payload, thunkApi) => {
    
    const { id, data } = payload;
    console.log("Data:", data);
    console.log("id :", id);
    const response = await productsApi.patchRiview(id, data);
    return response.data;
  }
);
