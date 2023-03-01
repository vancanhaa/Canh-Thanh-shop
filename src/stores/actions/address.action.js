import { createAsyncThunk } from "@reduxjs/toolkit";
import { addressApi } from "../../api/address.api";

export const fetchAddress = createAsyncThunk(
    "address/fetchAddress",
    async (payload, thunkApi) => {
        const { id } = payload
        const response = await addressApi.getAddress(id)
        return response.data
    }
)

export const fetchCreateAddress = createAsyncThunk(
    "address/fetchCreateAddress",
    async (payload, thunkApi) => {
        const { id, list_address } = payload
        const newData = {
            id: id,
            list_address: list_address
        }
        const response = await addressApi.createAddress(newData)
        return response.data
    }
)

export const fetchChangeAddress = createAsyncThunk(
    "address/fetchChangeAddress",
    async (payload, thunkApi) => {
        const { id, data } = payload
        const response = await addressApi.patchAddress(id, data)
        return response.data
    }
)

export const fetchListProvinces = createAsyncThunk(
    "address/fetchListProvinces",
    async (payload, thunkApi) => {
        const response = await addressApi.getListProvinces()
        return response.data
    }
)

export const fetchListDistricts = createAsyncThunk(
    "address/fetchListDistricts",
    async (payload, thunkApi) => {
        const response = await addressApi.getListDistricts(payload)
        return response.data
    }
)

export const fetchListWards = createAsyncThunk(
    "address/fetchListWards",
    async (payload, thunkApi) => {
        const response = await addressApi.getListWards(payload)
        return response.data
    }
)


