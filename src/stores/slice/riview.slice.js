import { createSlice } from "@reduxjs/toolkit";
import { addProductRiviewId } from "../actions/product.action";

const riviewInitialState = {
  riviews: [
    {
      idUser: "",
      firstName: "",
      lastName: "",
      rate: 0,
      review: "",
    },
  ],
  fetchingRiview: false,
};

const riviewSlice = createSlice({
  name: "riviews",
  initialState: riviewInitialState,
  extraReducers: (builder) => {
    //fetchAdd riview
    builder.addCase(addProductRiviewId.pending, (state, action) => {
      state.fetchingRiview = true;
    });
    builder.addCase(addProductRiviewId.fulfilled, (state, action) => {
      state.fetchingRiview = false;
      state.riviews = action.payload.riviews;
      console.log(action.payload);
    });
    builder.addCase(addProductRiviewId.rejected, (state, action) => {
      state.fetchingRiview = false;
    });
  },
});

export const riviewReducer = riviewSlice.reducer;
