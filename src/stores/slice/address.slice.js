import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAddress,
  fetchChangeAddress,
  fetchCreateAddress,
  fetchListDistricts,
  fetchListProvinces,
  fetchListWards,
} from "../actions/address.action";

const addressInitialState = {
  address: {
    id: "",
    list_address: [
      {
        full_name: "",
        phone_number: "",
        province: {
          name: "",
          code: "",
        },
        district: {
          name: "",
          code: "",
        },
        ward: {
          name: "",
          code: "",
        },
        specific_address: "",
      },
    ],
  },
  provinces: [],
  districts: [],
  wards: [],
  fetchingAddress: false,
};

const addressSlice = createSlice({
  name: "address",
  initialState: addressInitialState,
  extraReducers: (builder) => {
    //fetchAddress
    builder.addCase(fetchAddress.pending, (state, action) => {
      state.fetchingAddress = true;
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.address = action.payload;
      state.fetchingAddress = false;
    });
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.fetchingAddress = false;
    });

    //fetchCreateAddress
    builder.addCase(fetchCreateAddress.pending, (state, action) => {
      state.fetchingAddress = true;
    });
    builder.addCase(fetchCreateAddress.fulfilled, (state, action) => {
      state.fetchingAddress = false;
      const {id, list_address} = action.payload
      state.address.id = id;
      state.address.list_address = list_address
    });
    builder.addCase(fetchCreateAddress.rejected, (state, action) => {
      state.fetchingAddress = false;
    });

    //fetchChangeAddress
    builder.addCase(fetchChangeAddress.pending, (state, action) => {
      state.fetchingAddress = true;
    });
    builder.addCase(fetchChangeAddress.fulfilled, (state, action) => {
      state.fetchingAddress = false;
      state.address = action.payload;
    });
    builder.addCase(fetchChangeAddress.rejected, (state, action) => {
      state.fetchingAddress = false;
    });

    //fetchListProvinces
    builder.addCase(fetchListProvinces.pending, (state, action) => {
      state.fetchingAddress = true;
    });
    builder.addCase(fetchListProvinces.fulfilled, (state, action) => {
      state.fetchingAddress = false;
      state.provinces = action.payload;
    });
    builder.addCase(fetchListProvinces.rejected, (state, action) => {
      state.fetchingAddress = false;
    });

    //fetchListDistricts
    builder.addCase(fetchListDistricts.pending, (state, action) => {
      state.fetchingAddress = true;
    });
    builder.addCase(fetchListDistricts.fulfilled, (state, action) => {
      state.fetchingAddress = false;
      state.districts = action.payload;
    });
    builder.addCase(fetchListDistricts.rejected, (state, action) => {
      state.fetchingAddress = false;
    });

    //fetchListWards
    builder.addCase(fetchListWards.pending, (state, action) => {
      state.fetchingAddress = true;
    });
    builder.addCase(fetchListWards.fulfilled, (state, action) => {
      state.fetchingAddress = false;
      state.wards = action.payload;
    });
    builder.addCase(fetchListWards.rejected, (state, action) => {
      state.fetchingAddress = false;
    });
  },
});

export const addressReducer = addressSlice.reducer;
