import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { localStorageUlti } from "../../utils/localStorage";

const USER_INFO_KEY = "user_info";
const { get, set, remove } = localStorageUlti(USER_INFO_KEY, null);
const userInfoFromStorage = get();

const initialState = {
  userInfoState: {
    data: userInfoFromStorage,
    loading: false,
    error: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      remove();
      state.userInfoState = {
        ...state.userInfoState,
        loading: true,
      };
    },
    loginActionSuccess: (state, action) => {
      const userInfoResponse = { ...action.payload };
      set(userInfoResponse);
      state.userInfoState = {
        ...state.userInfoState,
        loading: false,
        data: userInfoResponse,
      };
      notification.success({
        message: "Login success! Now you can shopping",
        style: {border: "3px solid #71be34"}

      });
    },
    loginActionFailed: (state, action) => {
      remove();
      notification.error({
        message: `Login Failed: ${action.payload}`,
        style: {border: "3px solid #ff623d"},
        duration: 3
      });
    },
    logoutAction: (state, action) => {
      remove();
      state.userInfoState = {
        ...state.userInfoState,
        loading: false,
        data: null,
      };
    },
    registerAction: (state, action) => {
      remove();
      state.userInfoState = {
        ...state.userInfoState,
        loading: true,
      };
    },
    registerActionSuccess: (state, action) => {
      localStorage.setItem("REGISTER", "register");
      state.userInfoState = {
        ...state.userInfoState,
        loading: false,
        data: null,
      };
      notification.success({
        message: "Register success! Now you can Login",
      });
    },
    registerActionFailed: (state, action) => {
      remove();
      notification.error({
        message: `Register Failed: ${action.payload}`,
      });
    },
  },
});

export const {
  loginAction,
  loginActionSuccess,
  loginActionFailed,
  registerAction,
  registerActionSuccess,
  registerActionFailed,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
