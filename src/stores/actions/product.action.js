import { createAsyncThunk } from "@reduxjs/toolkit";
import { productsApi } from "../../api/products.api";

export const fetchProductList = createAsyncThunk(
  "product/fetchProductList",
  async (payload, thunkApi) => {
    const { page, limit } = payload;

    const reponse = await productsApi.getProductList(page, limit);

    console.log(reponse.headers["x-total-count"]);

    return {
      product: reponse.data,
      total: reponse.headers["x-total-count"],
    };
  }
)
