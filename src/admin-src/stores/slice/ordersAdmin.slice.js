import { createSlice } from "@reduxjs/toolkit"

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

    }
})

export const ordersAdminReducer = ordersAdminSlice.reducer