import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderApi } from "../../api/order.api";

export const fetchOrder = createAsyncThunk(
    "order/fetchOrder",
    async (payload, thunkApi) => {
        const reponse = await orderApi.getOrder(payload)
        return reponse.data
    }
)

export const fetchAddOrder = createAsyncThunk(
    "order/fetchAddOrder",
    async (payload, thunkApi) => {
        const response = await orderApi.postOrder(payload)
        return response.data
    }
)

export const fetchDeleteOrder = createAsyncThunk(
    "order/fetchDeleteOrder",
    async (payload, thunkApi) => {
        const response = await orderApi.deleteOrder(payload)
        return response.data
    }
)

export const fetchOrderDetail = createAsyncThunk(
    "order/fetchOrderDetail",
    async (payload, thunkApi) => {
        const response = await orderApi.getOrderDetail(payload)
        return response.data
    }
)