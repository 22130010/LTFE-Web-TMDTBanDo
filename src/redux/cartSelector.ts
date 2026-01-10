import {createSelector} from '@reduxjs/toolkit';
import {RootState} from "./store";

export const cartItemsSelector = (state: RootState) => state.cart.items;

// Đếm tổng số sản phẩm
export const cartCountSelector = createSelector(
    cartItemsSelector, (cartItems) =>
        cartItems.reduce(
            (count, item) => count + item.quantity, 0
        )
);

// Tính tổng tiền
export const cartTotalSelector = createSelector(
    cartItemsSelector, (cartItems) =>
        cartItems.reduce(
            (total, item) => total + item.price * item.quantity, 0
        )
);

export default cartTotalSelector;
