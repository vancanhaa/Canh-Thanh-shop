import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./slice/auth.slice";
import { cartReducer } from "./slice/cart.slice";
import { productReducer } from "./slice/product.slice";

const rootReducer = {
  user: authReducer,
  product: productReducer,
  cart: cartReducer
};

export const rootStore = configureStore({
  reducer: rootReducer,
});
