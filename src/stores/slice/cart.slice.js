import { createSlice } from "@reduxjs/toolkit"
import { fetchCart, fetchChangeCart } from "../actions/cart.action"

const cartInitialState = {
    cart: {
        id: "",
        products: [
            {
                id: "",
                name: "",
                imageUrl: "",
                color: "",
                size:"",
                quantity: 0,
                price: 0
            }
        ]
    },
    fetchingCart: false
}

const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialState,
    reducers: {
        getDataCart: (state, action) => {

        }
    },
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

        //fetchAllProduct
        // builder.addCase(fetchAllProduct.pending, (state, action) => {
        //     state.fetchingCart = true
        // })
        // builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
        //     state.fetchingCart = false
        //     localStorageUlti("all_product_list", []).set(action.payload)
        // })
        // builder.addCase(fetchAllProduct.rejected, (state, action) => {
        //     state.fetchingCart = false
        // })

        //fetchChangeCart
        builder.addCase(fetchChangeCart.pending, (state, action) => {
            state.fetchingCart = true
        })
        builder.addCase(fetchChangeCart.fulfilled, (state, action) => {
            state.fetchingCart = false
            state.cart = action.payload
        })
        builder.addCase(fetchChangeCart, (state, action) => {
            state.fetchingCart = false
        })
    }
})

export const cartReducer = cartSlice.reducer