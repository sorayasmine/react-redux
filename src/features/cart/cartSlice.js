import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const selectCartIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id
      );
      if (selectCartIndex !== -1) {
        state.cartItems[selectCartIndex].quantity += 1;
        state.cartItems[selectCartIndex].totalPrice =
          state.cartItems[selectCartIndex].quantity *
          state.cartItems[selectCartIndex].price;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
    },
    addItemQuantity: (state, action) => {
      const newItem = action.payload;
      const selectCartIndex = state.cartItems.findIndex(
        (item) => item.id === newItem
      );
      if (selectCartIndex !== -1) {
        state.cartItems[selectCartIndex].quantity += 1;
        state.cartItems[selectCartIndex].totalPrice =
          state.cartItems[selectCartIndex].quantity *
          state.cartItems[selectCartIndex].price;
      }
    },
    reduceItemQuantity: (state, action) => {
      const newItem = action.payload;
      const selectCartIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id
      );
      if (selectCartIndex !== -1) {
        state.cartItems[selectCartIndex].quantity - 1;
        state.cartItems[selectCartIndex].totalPrice =
          state.cartItems[selectCartIndex].quantity *
          state.cartItems[selectCartIndex].price;
      }
    },
    removeItemFromCart: (state, action) => {
      const newItem = action.payload;
      const selectCartIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id
      );
      if (selectCartIndex !== -1) {
        state.cartItems.splice(selectCartIndex, 1); // Removes the item at the found index
      }
    },
  },
});

export const {
  addToCart,
  addItemQuantity,
  reduceItemQuantity,
  removeItemFromCart,
} = cartSlice.actions;

export default cartSlice;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalItems = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.price, 0);
