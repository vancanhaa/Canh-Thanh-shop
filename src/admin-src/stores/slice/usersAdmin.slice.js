import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsersAdmin, fetchUsersListAdmin } from "../actions/usersAdmin.action";

const usersAdminInitialState = {
  listUsers: [],
  allUsers: [],
  userDetail: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  fetchingUsersAdmin: false,
};

const usersAdminSlice = createSlice({
  name: "usersAdmin",
  initialState: usersAdminInitialState,
  extraReducers: (builder) => {
    //fetchUsersListAdmin
    builder.addCase(fetchUsersListAdmin.pending, (state, action) => {
      state.fetchingUsersAdmin = true;
    });
    builder.addCase(fetchUsersListAdmin.fulfilled, (state, action) => {
      const { listUsers, pagination } = action.payload;
      state.fetchingUsersAdmin = false;
      state.listUsers = listUsers;
      state.pagination = pagination;
    });
    builder.addCase(fetchUsersListAdmin.rejected, (state, action) => {
      state.fetchingUsersAdmin = false;
    });

    //fetchAllUsersAdmin
    builder.addCase(fetchAllUsersAdmin.pending, (state, action) => {
      state.fetchingUsersAdmin = true;
    });
    builder.addCase(fetchAllUsersAdmin.fulfilled, (state, action) => {
      state.allUsers = action.payload
      state.fetchingUsersAdmin = false;
    });
    builder.addCase(fetchAllUsersAdmin.rejected, (state, action) => {
      state.fetchingUsersAdmin = false;
    });
  },
});

export const usersAdminReducer = usersAdminSlice.reducer;
