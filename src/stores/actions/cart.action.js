import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartsApi } from "../../api";

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (payload, thunkApi) => {
        const { idUser } = payload;
        const response = await cartsApi.getCart(idUser)
        return response.data
    }
)

export const fetchChangeCart = createAsyncThunk(
    "cart/fetchChangeCart",
    async (payload, thunkApi) => {
        const { idUser, data } = payload;
        const response = await cartsApi.patchCart(idUser, data)
        return response.data
    }
)
