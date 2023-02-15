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
  "api/product",
  async (payload, thunkApi) => {
    const idproduct = payload.idproduct;
    const response = await productsApi.getSingleProduct(payload);
    return response.data;
  }
);

export const searchProduct = createAsyncThunk(
  "api/products",
  async (payload, thunkApi) => {
    const response = await productsApi.searchProduct(payload);
    return response.data;
  }
);

export const addNewProduct = createAsyncThunk(
  "api/products",
  async (payload, thunkApi) => {
    const response = await productsApi.addNewProduct(payload);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "api/products",
  async (payload, thunkApi) => {
    const response = await productsApi.updateProduct(payload);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "api/product",
  async (payload, thunkApi) => {
    const response = await productsApi.getAllProduct(payload);
    return response.data;
  }
);
