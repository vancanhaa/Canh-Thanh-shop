import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { fetchAddOrder } from "../actions/order.action";

const orderInitialState = {
  list_order: [
    {
      id: "",
      id_user: "",
      time_create: "",
      cart: [],
      checkout_address: {},
      payment_method: "",
      status_payment: false,
      status_order: "",
    },
  ],
  fetchingOrder: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState: orderInitialState,
  extraReducers: (builder) => {
    //fetchAddOrder
    builder.addCase(fetchAddOrder.pending, (state, action) => {
      state.fetchingOrder = true;
    });
    builder.addCase(fetchAddOrder.fulfilled, (state, action) => {
      state.fetchingOrder = false;
      notification.success({
        message: "Đặt hàng thành công!",
        style: { border: "2px solid #71be34" },
        duration: 2,
      });
    });
    builder.addCase(fetchAddOrder.rejected, (state, action) => {
      state.fetchingOrder = false;
    });
  },
});

export const orderReducer = orderSlice.reducer;
