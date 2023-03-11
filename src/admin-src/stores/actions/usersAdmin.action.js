import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersAdminApi } from "../../api";

export const fetchUsersListAdmin = createAsyncThunk(
    "usersAdmin/fetchUsersListAdmin",
    async (payload, thunkApi) => {
        const { page, limit } = payload
        const response = await usersAdminApi.getUsersList(page, limit)
        return {
            listUsers: response.data,
            pagination: {
                page,
                limit,
                total: response.headers["x-total-count"]
            }
        }
    }
)

export const fetchDeleteUserAdmin = createAsyncThunk(
    "usersAdmin/fetchDeleteUserAdmin",
    async (payload, thunkApi) => {
        const response = await usersAdminApi.deleteUser(payload)
        return response.data
    }
)