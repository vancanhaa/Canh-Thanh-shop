import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import {
  fetchAddOrder,
  fetchOrder,
  fetchOrderDetail,
} from "../actions/order.action";

const orderInitialState = {
  listOrder: [
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
  orderDetail: null,
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

    //fetchOrder
    builder.addCase(fetchOrder.pending, (state, action) => {
      state.fetchingOrder = true;
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.fetchingOrder = false;
      state.listOrder = action.payload;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.fetchingOrder = false;
    });

    //fetchOrderDetail
    builder.addCase(fetchOrderDetail.pending, (state, action) => {
      state.fetchingOrder = true;
    });
    builder.addCase(fetchOrderDetail.fulfilled, (state, action) => {
      state.fetchingOrder = false;
      state.orderDetail = action.payload;
    });
    builder.addCase(fetchOrderDetail.rejected, (state, action) => {
      state.fetchingOrder = false;
    });
  },
});

export const orderReducer = orderSlice.reducer;
