import { createSlice } from "@reduxjs/toolkit"
import { fetchUsersListAdmin } from "../actions/usersAdmin.action";

const usersAdminInitialState = {
    listUsers: [],
    userDetail: {},
    pagination: {
        page: 1,
        limit: 10,
        total: 0
    },
    fetchingUserAdmin: false
}

const usersAdminSlice = createSlice({
    name: "usersAdmin",
    initialState: usersAdminInitialState,
    extraReducers: (builder) => {
//fetchUsersListAdmin
builder.addCase(fetchUsersListAdmin.pending, (state, action) => {
    state.fetchingProductList = true;
  });
  builder.addCase(fetchUsersListAdmin.fulfilled, (state, action) => {
    const { listUsers, pagination } = action.payload;
    state.fetchingProductList = false;
    state.listUsers = listUsers;
    state.pagination = pagination;
  });
  builder.addCase(fetchUsersListAdmin.rejected, (state, action) => {
    state.fetchingProductList = false;
  });
    }
})

export const usersAdminReducer = usersAdminSlice.reducer