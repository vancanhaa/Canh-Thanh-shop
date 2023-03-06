import { configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "./slice/address.slice";

import { authReducer } from "./slice/auth.slice";
import { cartReducer } from "./slice/cart.slice";
import { productReducer } from "./slice/product.slice";
import { riviewReducer } from "./slice/riview.slice";

const rootReducer = {
  user: authReducer,
  product: productReducer,
  cart: cartReducer,
  address: addressReducer,
  riview : riviewReducer,
};

export const rootStore = configureStore({
  reducer: rootReducer,
});
