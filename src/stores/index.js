import { configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "./slice/address.slice";

import { authReducer } from "./slice/auth.slice";
import { cartReducer } from "./slice/cart.slice";
import { orderReducer } from "./slice/order.slice";
import { productReducer } from "./slice/product.slice";

const rootReducer = {
  user: authReducer,
  product: productReducer,
  cart: cartReducer,
  address: addressReducer,
  order: orderReducer
};

export const rootStore = configureStore({
  reducer: rootReducer,
});
