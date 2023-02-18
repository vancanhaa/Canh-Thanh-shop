import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./slice/auth.slice";
import { productReducer } from "./slice/product.slice";

const rootReducer = {
  user: authReducer,
  product: productReducer,
};

export const rootStore = configureStore({
  reducer: rootReducer,
});
