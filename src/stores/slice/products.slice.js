import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { localStorageUlti } from "../../utils/localStorage";


const initialState = {
  productsState: {
    allProduct: localStorageUlti("all_product", []).get(),
    singleProduct: localStorageUlti("single_product", {}),
    loading: false,
    error: null,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAllProductAction: (state, action) => {
      state.productState = {
        ...state.userInfoState,
        loading: false
      }
      const allProductResponse = {...action.payload};
      localStorageUlti("all_product_key", [])
    },
    getSingleProduct: (state, action) => {
      
    }
  }
});

export const {} = productSlice.actions;
export const userReducer = productSlice.reducer;
