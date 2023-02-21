import { createSlice } from "@reduxjs/toolkit";
import { fetchProductList } from "../actions/product.action";
const productInitialState = {
  products: [],
  textSearch: '',
  filter: {},
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
  },
  fetchingProductList: false,
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
      state.textSearch = action.payload
    }
  },
  extraReducers: (builder) => {
    //fetchProductList
    builder.addCase(fetchProductList.pending, (state, action) => {
      state.fetchingProductList = true;
    });
    builder.addCase(fetchProductList.fulfilled, (state, action) => {
      const { products, textSearch, filter, pagination} = action.payload;
      
      
      state.fetchingProductList = false;
      state.products = products;
      state.textSearch = textSearch;
      state.filter = filter;
      state.pagination = pagination
    });
    builder.addCase(fetchProductList.rejected, (state, action) => {
      state.fetchingProductList = false;
    });
  },
});

export const productReducer = productSlice.reducer;

export const { changePagination, changeTextSearch } = productSlice.actions;
