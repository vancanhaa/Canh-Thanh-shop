import { createSlice } from "@reduxjs/toolkit"
import { fetchOrdersListAdmin } from "../actions/ordersAdmin.action";

const ordersAdminInitialState = {
    listOrders: [],
    orderDetail: null,
    pagination: {
        page: 1,
        limit: 12,
        total: 0
    },
    fetchingOrdersAdmin: false
}

const ordersAdminSlice = createSlice({
    name: "ordersAdmin",
    initialState: ordersAdminInitialState,
    extraReducers: (builder) => {
//fetchOrdersListAdmin
builder.addCase(fetchOrdersListAdmin.pending, (state, action) => {
    state.fetchingProductList = true;
  });
  builder.addCase(fetchOrdersListAdmin.fulfilled, (state, action) => {
    const { listOrders, pagination } = action.payload;
    state.fetchingProductList = false;
    state.listOrders = listOrders;
    state.pagination = pagination;
  });
  builder.addCase(fetchOrdersListAdmin.rejected, (state, action) => {
    state.fetchingProductList = false;
  });
    }
})

export const ordersAdminReducer = ordersAdminSlice.reducer