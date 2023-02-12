import { createAsyncThunk } from "@reduxjs/toolkit";
import { productsApi } from "../../api/products.api";

export const getAllProduct = createAsyncThunk(
  "api/products",
  async (payload, thunkApi) => {
    const response = await productsApi.getAllProduct(payload);
    return response.data;
  }
);

export const getSingleProduct = createAsyncThunk(
  "api/",
  async (payload, thunkApi) => {
     const idproduct = payload.idproduct;
    const response = await productsApi.getAllProduct(payload);
    return response.data;
  }
);

