import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { localStorageUlti } from "../../utils/localStorage";
import {
  addNewProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "../actions/product.action";

const initialState = {
  productsState: {
    allProduct: localStorageUlti("all_product", []).get(),
    singleProduct: localStorageUlti("single_product", {}),
    loading: false,
    error: null,
  },
};

const productSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    //set get all product
    [getAllProduct.pending]: (state) => {
      state.loading = true;
    },
    [getAllProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload;
    },
    [getAllProduct.rejected]: (state) => {
      state.loading = false;
    },

    //set get product Id
    [getSingleProduct.pending]: (state) => {
      state.isFetchProductID = true;
    },
    [getSingleProduct.fulfilled]: (state, { payload }) => {
      state.isFetchProductID = false;
      state.product = payload;
    },
    [getSingleProduct.rejected]: (state) => {
      state.isFetchProductID = false;
    },

    //set post Product
    [addNewProduct.fulfilled]: (state, { payload }) => {
      state.products.push(payload);
    },

    //set update Product
    [updateProduct.fulfilled]: (state, { payload }) => {
      const index = state.products.findIndex(
        (product) => product.id === payload.id
      );
      //console.log(index)
      // console.log(payload)
      state.products[index] = payload;
    },

    //set delete Product
    [deleteProduct.fulfilled]: (state, { payload }) => {
      const index = state.products.findIndex(
        (product) => product.id === payload.id
      );
      state.products.splice(index, 1);
    },
  },
});
export const productReducer = productSlice.reducer;
