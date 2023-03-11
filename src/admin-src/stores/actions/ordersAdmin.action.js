import { createAsyncThunk } from "@reduxjs/toolkit";
import { ordersAdminApi } from "../../api";

export const fetchOrdersListAdmin = createAsyncThunk(
    "ordersAdmin/fetchOrdersListAdmin",
    async (payload, thunkApi) => {
        const {page, limit} = payload
        const respone = await ordersAdminApi.getOrdersList(page, limit)
        return {
            listOrders: respone.data,
            pagination: {
                page,
                limit,
                total: respone.headers["x-total-count"]
            }
        }
    }
)

export const fetchDeleteOrderAdmin = createAsyncThunk(
    "usersAdmin/fetchDeleteUserAdmin",
    async (payload, thunkApi) => {
        const response = await ordersAdminApi.deleteOrder(payload)
        return response.data
    }
)