import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { localStorageUlti } from "../../utils/localStorage";
import { loginAction, registerAction } from "../actions/auth.action";

const USER_INFO_KEY = "user_info";
const { get, set, remove } = localStorageUlti(USER_INFO_KEY, null);
const userInfoFromStorage = get();

const initialState = {
  userInfoState: {
    data: userInfoFromStorage,
    loading: false,
    registerSuccess: false
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      remove();
      state.userInfoState = {
        ...state.userInfoState,
        loading: true,
      };
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      const userInfoResponse = { ...action.payload };
      set(userInfoResponse);
      state.userInfoState = {
        ...state.userInfoState,
        loading: false,
        data: userInfoResponse,
      };
      notification.success({
        message: "Login success! Now you can shopping",
        style: { border: "3px solid #71be34" },
      });
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      remove();
      state.userInfoState = {
        ...state.userInfoState,
        loading: false,
      };
      console.log(action)
      notification.error({
        message: `Login Failed: User ${action.payload}`,
        style: { border: "3px solid #ff623d" },
        duration: 3,
      });
    });

    builder.addCase(registerAction.pending, (state, action) => {
      remove();
      state.userInfoState = {
        ...state.userInfoState,
        loading: true,
      };
    });

    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.userInfoState = {
        ...state.userInfoState,
        registerSuccess: !state.userInfoState.registerSuccess,
        loading: false,
        data: null,
      };
      notification.success({
        message: "Đăng ký thành công!",
        description: "Đăng nhập ngay bây giờ"
      });
    });

    builder.addCase(registerAction.rejected, (state, action) => {
      remove();
      notification.error({
        message: `Register Failed: ${action.payload}`,
      });
    });
  },
});

export const authReducer = authSlice.reducer;
