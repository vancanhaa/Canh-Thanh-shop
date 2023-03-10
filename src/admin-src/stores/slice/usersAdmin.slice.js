import { createSlice } from "@reduxjs/toolkit"

const usersAdminInitialState = {
    listUsers: [],
    userDetail: {},
    pagination: {
        page: 1,
        limit: 12,
        total: 0
    },
    fetchingUserAdmin: false
}

const usersAdminSlice = createSlice({
    name: "usersAdmin",
    initialState: usersAdminInitialState,
    extraReducers: (builder) => {

    }
})

export const usersAdminReducer = usersAdminSlice.reducer