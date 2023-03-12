import { createSlice } from "@reduxjs/toolkit";
import { fetchAllOrdersAdmin, fetchOrdersListAdmin } from "../actions/ordersAdmin.action";

const ordersAdminInitialState = {
  listOrders: [],
  allOrders: [],
  orderDetail: null,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
  },
  fetchingOrdersAdmin: false,
};

const ordersAdminSlice = createSlice({
  name: "ordersAdmin",
  initialState: ordersAdminInitialState,
  extraReducers: (builder) => {
    //fetchOrdersListAdmin
    builder.addCase(fetchOrdersListAdmin.pending, (state, action) => {
      state.fetchingOrdersAdmin = true;
    });
    builder.addCase(fetchOrdersListAdmin.fulfilled, (state, action) => {
      const { listOrders, pagination } = action.payload;
      state.fetchingOrdersAdmin = false;
      state.listOrders = listOrders;
      state.pagination = pagination;
    });
    builder.addCase(fetchOrdersListAdmin.rejected, (state, action) => {
      state.fetchingOrdersAdmin = false;
    });

    //fetchAllOrdersAdmin
    builder.addCase(fetchAllOrdersAdmin.pending, (state, action) => {
      state.fetchingOrdersAdmin = true;
    });
    builder.addCase(fetchAllOrdersAdmin.fulfilled, (state, action) => {
      state.fetchingOrdersAdmin = false;
      state.allOrders = action.payload
    });
    builder.addCase(fetchAllOrdersAdmin.rejected, (state, action) => {
      state.fetchingOrdersAdmin = false;
    });
  },
});

export const ordersAdminReducer = ordersAdminSlice.reducer;
