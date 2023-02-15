import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./slice/auth.slice";
import { productReducer } from "./slice/products.slice";

const rootReducer = {
  user: authReducer,
  products: productReducer,
};

export const rootStore = configureStore({
  reducer: rootReducer,
});
