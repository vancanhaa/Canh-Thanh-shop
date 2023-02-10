import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { userReducer } from "./slice/user.slice";

const rootReducer = {
    user: userReducer,
}

export const rootStore = configureStore({
    reducer: rootReducer,

})

