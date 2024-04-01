import {createSlice } from "@reduxjs/toolkit"
import { updateCart } from "../utils/cartUtils";

const initialState = {
    cartItems: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
    shippingAddress: localStorage.getItem("shipping")
        ? JSON.parse(localStorage.getItem("shipping"))
        : {},
    paymentMethod: localStorage.getItem("paymentMethod")
        ? localStorage.getItem("paymentMethod")
        : "",
};


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existingItem = state.cartItems.find(x => x._id === item._id);

            if (existingItem) {
                state.cartItems = state.cartItems.map(x => x._id === existingItem._id ? item : x);
            } else {
                state.cartItems=[...state.cartItems,item]
            }

            return updateCart(state);

        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(x => x._id !== action.payload);

            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem("shipping", JSON.stringify( action.payload))
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem("paymentMethod", action.payload);
        },
        clearCartAfterPlacingOrder: (state, action) => {
            state.cartItems = [];
            state.shippingAddress = {};
            state.paymentMethod = "";
            localStorage.removeItem("cart", "shipping", "paymentMethod");
        }
    }
})

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartAfterPlacingOrder,
} = cartSlice.actions;

export default cartSlice.reducer