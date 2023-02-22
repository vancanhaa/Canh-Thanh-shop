import { createSlice } from "@reduxjs/toolkit"
import { fetchCart } from "../actions/cart.action"

const cartInitialState = {
    cart: {
        id: "",
        products: []
    },
    fetchingCart: false
}

const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialState,
    extraReducers: (builder) => {
        //fetchCart
        builder.addCase(fetchCart.pending, (state, action) => {
            state.fetchingCart = true
        });
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.fetchingCart = false;
            state.cart = action.payload
        });
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.fetchingCart = false
        })
    }
})