import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductById,
  fetchProductList,
} from "../actions/product.action";
const productInitialState = {
  allProducts: [],
  products: [],
  product: {},
  textSearch: "",
  filter: {},
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
  },
  fetchingProductList: false,
  fetchingProductById: false,
};

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
  reducers: {
    changePagination: (state, action) => {
      state.page = action.payload.page;
      state._limit = action.payload.limit;
    },
    changeTextSearch: (state, action) => {
      state.textSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    //fetchProductList
    builder.addCase(fetchProductList.pending, (state, action) => {
      state.fetchingProductList = true;
    });
    builder.addCase(fetchProductList.fulfilled, (state, action) => {
      const { products, textSearch, filter, pagination } = action.payload;
      state.fetchingProductList = false;
      state.filter = filter;
      state.products = products;
      state.textSearch = textSearch;
      state.pagination = pagination;
    });
    builder.addCase(fetchProductList.rejected, (state, action) => {
      state.fetchingProductList = false;
    });

    // fetch product detail
    builder.addCase(fetchProductById.pending, (state, action) => {
      state.fetchingProductById = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      const { product } = action.payload;
      state.fetchingProductById = false;
      state.product = product;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.fetchingProductById = false;
    });

    //fetchAllProducts
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      state.fetchingProductList = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.fetchingProductList = false;
      state.allProducts = action.payload;
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.fetchingProductList = false;
    });
  },
});

export const productReducer = productSlice.reducer;
export const { changePagination, changeTextSearch } = productSlice.actions;
