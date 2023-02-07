import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { userReducer } from "./slice/user.slice";
import { mySaga } from "./saga"


const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const rootReducer = {
    user: userReducer,
}

export const rootStore = configureStore({
    reducer: rootReducer,
      // Value nhận vào là list các middleware
  // getDefaultMiddleware để ta trả về các middleware sẵn có trong redux
  // và nối với middleware vừa tạo là saga-middleware
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    ...middleware
  ]
})

sagaMiddleware.run(mySaga)