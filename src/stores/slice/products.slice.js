import { createSlice } from "@reduxjs/toolkit";
import { fetchProductList } from "../actions/product.action";
const productInitialState = {
  product: [],
  fetchingProductList: true,
  pagination: {
    page: 1,
    limit: 10,
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
    builder.addCase(fetchProductList.pending, (state, action) => {
      state.fetchingProductList = true;
    });
    // [getAllProduct.pending]: (state) => {
    //   state.fetchingProductList = true;
    // },
    builder.addCase(fetchProductList.fulfilled, (state, action) => {
      state.fetchingProductList = false;
      state.product = action.payload.product;
      state.pagination.total = action.payload.total;
    });
    builder.addCase(fetchProductList.rejected, (state, action) => {
      state.fetchingProductList = false;
    });
  },
});

export const productReducer = productSlice.reducer;

export const { changePagination } = productSlice.actions;
