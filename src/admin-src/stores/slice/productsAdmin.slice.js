import { createSlice } from "@reduxjs/toolkit"

const productsAdminInitialState = {
    allProducts: [],
    listProducts: [],
    productDetail: {},
    textSearch: "",
    filter: {},
    pagination: {
        page: 1,
        limit: 12,
        total: 0
    },

    fetchingProductsAdmin: false
}

const productsAdminSlice = createSlice({
    name: "productsAdmin",
    initialState: productsAdminInitialState,
    extraReducers: (builder) => {

    }
})

export const productsAdminReducer = productsAdminSlice.reducer