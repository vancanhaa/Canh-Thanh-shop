import { configureStore } from "@reduxjs/toolkit";
import { ordersAdminReducer } from "../admin-src/stores/slice/ordersAdmin.slice";
import { productsAdminReducer } from "../admin-src/stores/slice/productsAdmin.slice";
import { usersAdminReducer } from "../admin-src/stores/slice/usersAdmin.slice";
import { addressReducer } from "./slice/address.slice";

import { authReducer } from "./slice/auth.slice";
import { cartReducer } from "./slice/cart.slice";
import { orderReducer } from "./slice/order.slice";
import { productReducer } from "./slice/product.slice";
import { riviewReducer } from "./slice/riview.slice";

const rootReducer = {
  user: authReducer,
  product: productReducer,
  cart: cartReducer,
  address: addressReducer,
  order: orderReducer,
  usersAdmin: usersAdminReducer,
  productsAdmin: productsAdminReducer,
  ordersAdmin: ordersAdminReducer,
  riviewReducer,
};

export const rootStore = configureStore({
  reducer: rootReducer,
});
