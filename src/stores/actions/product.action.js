import { createAsyncThunk } from "@reduxjs/toolkit";
import { productsApi } from "../../api";

export const fetchProductList = createAsyncThunk(
  "product/fetchProductList",
  async (payload, thunkApi) => {
    const { textSearch, filter, page, limit} = payload;
    
    const response = await productsApi.getProductList(
      page, limit, filter, textSearch
    );
    return {
      products: response.data,
      textSearch: textSearch,
      filter: filter,
      pagination: {
        page,
        limit,
        total: response.headers["x-total-count"]
      }
    };
  }
);
