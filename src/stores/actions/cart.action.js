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