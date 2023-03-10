import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsListAdmin } from "../actions/productsAdmin.action";

const productsAdminInitialState = {
  allProducts: [],
  listProducts: [],
  productDetail: {},
  textSearch: "",
  filter: {},
  pagination: {
    page: 1,
    limit: 9,
    total: 0,
  },

  fetchingProductsAdmin: false,
};

const productsAdminSlice = createSlice({
  name: "productsAdmin",
  initialState: productsAdminInitialState,
  reducers: {
    changeTextSearch: (state, action) => {
        state.textSearch = action.payload;
      },
  },
  extraReducers: (builder) => {
    //fetchProductsListAdminAdmin
    builder.addCase(fetchProductsListAdmin.pending, (state, action) => {
      state.fetchingProductList = true;
    });
    builder.addCase(fetchProductsListAdmin.fulfilled, (state, action) => {
      const { listProducts, textSearch, filter, pagination } = action.payload;
      state.fetchingProductList = false;
      state.listProducts = listProducts;
      state.textSearch = textSearch;
      state.filter = filter;
      state.pagination = pagination;
    });
    builder.addCase(fetchProductsListAdmin.rejected, (state, action) => {
      state.fetchingProductList = false;
    });
  },
});

export const productsAdminReducer = productsAdminSlice.reducer;
export const { changeTextSearch } = productsAdminSlice.actions;

