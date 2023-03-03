import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderApi } from "../../api/order.api";

export const fetchOrder = createAsyncThunk(
    "order/fetchOrder",
    async (payload, thunkApi) => {
        const { idUser } = payload
        const reponse = await orderApi.getOrder(idUser)
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