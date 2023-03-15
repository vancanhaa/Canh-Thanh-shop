import { createAsyncThunk } from "@reduxjs/toolkit";
import { productsAdminApi } from "../../api";

export const fetchProductsListAdmin = createAsyncThunk(
  "productsAdmin/fetchProductsListAdmin",
  async (payload, thunkApi) => {
    const { textSearch, filter, page, limit } = payload;

    const response = await productsAdminApi.getProductList(
      page,
      limit,
      filter,
      textSearch
    );
    return {
      listProducts: response.data,
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

export const fetchDeleteProductAdmin = createAsyncThunk(
  "productsAdmin/fetchDeteteProductAdmin",
  async (payload, thunkApi) => {
    const response = await productsAdminApi.deleteProduct(payload);
    return response.data;
  }
);

export const fetchAllProductsAdmin = createAsyncThunk(
  "productsAdmin/fetchAllProductsAdmin",
  async (payload, thunkApi) => {
    const response = await productsAdminApi.getAllProducts();
    return response.data;
  }
);

export const fetchProductDetailAdmin = createAsyncThunk(
  "productsAdmin/fetchProductDetailAdmin",
  async (payload, thunkApi) => {
    const response = await productsAdminApi.getProductDetail(payload);
    return response.data;
  }
);

export const fetchEditProductAdmin = createAsyncThunk(
  "productsAdmin/fetchEditProductAdmin",
  async (payload, thunkApi) => {
    const { id, data } = payload;
    const response = await productsAdminApi.editProduct(id, data);
    return response.data;
  }
);

export const fetchAddProductAdmin = createAsyncThunk(
  "productsAdmin/fetchAddProductAdmin",
  async (payload, thunkApi) => {
    const response = await productsAdminApi.postNewProduct(payload);
    return response.data;
  }
);
