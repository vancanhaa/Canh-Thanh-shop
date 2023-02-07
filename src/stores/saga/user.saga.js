import { authApi } from "../../api";
import { put, takeEvery } from "redux-saga/effects";

import {
  loginAction,
  loginActionSuccess,
  loginActionFailed,
  registerActionSuccess,
  registerAction,
  registerActionFailed,
} from "../slice/user.slice";

function* login(action) {
  try {
    const loginPayload = action.payload;
    console.log(loginPayload);
    const loginPayloadData = {
      email: loginPayload.email,
      password: loginPayload.password
    }
    console.log("login Payload Data", loginPayloadData)
    const response = yield authApi.login({
      email: loginPayload.email,
      password: loginPayload.password
    });
    console.log("Response", response)
    yield put(loginActionSuccess(response.data.user));
  } catch (error) {
    yield put(loginActionFailed(error.response.data));
  }
}

function* register(action) {
  try {
    const registerPayload = action.payload;
    console.log(registerPayload)
    // const registerPayloadData = {
    //   id: registerPayload.id,
    //   role: registerPayload.role,
    //   email: registerPayload.email,
    //   password: registerPayload.password,
    //   firstName: registerPayload.firstName,
    //   lastName: registerPayload.lastName,
    //   phone: registerPayload.phone,
    // };
    // console.log(registerPayloadData)
    const response = yield authApi.register(registerPayload);
    yield put(registerActionSuccess(response.data.user));
  } catch (error) {
    yield put(registerActionFailed(error.response.data));
  }
}

export function* userSaga() {
  yield takeEvery(loginAction, login);
  yield takeEvery(registerAction, register);
}
