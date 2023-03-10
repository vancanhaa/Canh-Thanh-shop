import { createAsyncThunk } from "@reduxjs/toolkit";
import { productsAdminApi } from "../../api";

export const fetchProductsListAdmin = createAsyncThunk(
  "product/fetchProductsListAdmin",
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
