import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProductList, fetchCategoryProductList } from "../actions/product.action";
const productInitialState = {
  products: [],
  category: "all",
  fetchingProductList: false,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
  reducers: {
    changePagination: (state, action) => {
      state.pagination.page = action.payload.page;
      state.pagination.limit = action.payload.limit;
    },
  },
  extraReducers: (builder) => {
    //fetchAllProductList
    builder.addCase(fetchAllProductList.pending, (state, action) => {
      state.fetchingProductList = true;
    });
    builder.addCase(fetchAllProductList.fulfilled, (state, action) => {
      state.fetchingProductList = false;
      state.products = action.payload.products;
      state.pagination.total = action.payload.total;
      state.category = "all"
    });
    builder.addCase(fetchAllProductList.rejected, (state, action) => {
      state.fetchingProductList = false;
    });

    //fetchCategoryProduct
    builder.addCase(fetchCategoryProductList.pending, (state, action) => {
      state.fetchingProductList = true;
    });
    builder.addCase(fetchCategoryProductList.fulfilled, (state, action) => {
      state.fetchingProductList = false;
      state.products = action.payload.products;
      state.pagination.total = action.payload.total;
      state.category = action.payload.category
    });
    builder.addCase(fetchCategoryProductList.rejected, (state, action) => {
      state.fetchingProductList = false;
    });

  },
});

export const productReducer = productSlice.reducer;

export const { changePagination } = productSlice.actions;
