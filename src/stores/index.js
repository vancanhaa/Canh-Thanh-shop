import { configureStore } from "@reduxjs/toolkit";

import  {authReducer}  from "./slice/auth.slice";

const rootReducer = {
    user: authReducer,
}

export const rootStore = configureStore({
    reducer: rootReducer,

})

