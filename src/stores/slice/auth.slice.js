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
    error: null,
    isRegisterSuccess: false
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    //login
    builder.addCase(loginAction.pending, (state, action) => {
      remove();
      state.userInfoState = {
        ...state.userInfoState,
        loading: true,
      };
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      const userInfoResponse = { ...action.payload.user };
      set(userInfoResponse);
      state.userInfoState = {
        ...state.userInfoState,
        loading: false,
        data: userInfoResponse,
      };
      notification.success({
        message: "Đăng nhập thành công",
        style: { border: "3px solid #71be34" },
        duration: 2
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
        message: "Đăng nhập không thành công",
        description: `Email hoặc mật khẩu không chính xác`,
        style: { border: "3px solid #ff623d" },
        duration: 2,
      });
    });

    //register
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
        isRegisterSuccess: true,
        loading: false,
        data: null,
      };
      notification.success({
        message: "Đăng ký thành công!",
        description: "Đăng nhập ngay bây giờ",
        style: { border: "3px solid #71be34" },
        duration: 2,
      });
    });

    builder.addCase(registerAction.rejected, (state, action) => {
      remove();
      console.log(action.error)
      notification.error({
        message: "Đăng ký không thành công!",
        description: "Email đã tồn tại!",
        style: { border: "3px solid #ff623d" },
        duration: 2,

      });
    });
  },
  reducers: {
    logOut: (state, action) => {
      remove();
      state.userInfoState = {
        ...state.userInfoState,
        data: null,
      };
    },
    changeIsRegisterSuccess: (state, action) => {
      state.userInfoState = {
        ...state.userInfoState,
        isRegisterSuccess: false
      }
    }
  }
});
export const { logOut, changeIsRegisterSuccess } = authSlice.actions 
export const authReducer = authSlice.reducer;
