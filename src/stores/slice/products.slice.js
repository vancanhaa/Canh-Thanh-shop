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

const userSlice = createSlice({
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

export const {
  
} = userSlice.actions;
export const userReducer = userSlice.reducer;
