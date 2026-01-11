import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface cartItem{
    id: number;
    name: string;
    price: number;
    image: string;
    sizes: string[];
    colors: string[];
    quantity: number;
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: JSON.parse(localStorage.getItem("cart") || "[]") as cartItem[],
        showMiniCart: false,
    },
    reducers: {
        showMiniCart: (state) => {
            state.showMiniCart = true;
        },
        hideMiniCart: (state) => {
            state.showMiniCart = false;
        },

        setQuantity(state, action){
            const {id, sizes, colors, quantity} = action.payload;
            // kiem tra san pham
            const index = state.items.findIndex((item) =>
                item.id === id &&
                item.sizes === sizes &&
                item.colors === colors
                );
            if (index >= 0 && quantity >= 1) {
                state.items[index].quantity = quantity;
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },


        removeCart(state, action) {
            const {id, sizes, colors} = action.payload;
            state.items = state.items.filter(item =>
                !(item.id === id &&
                item.sizes === sizes &&
                item.colors === colors)
            );

            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        addToCart(state, action) {
            const newItems = action.payload;
            const index = state.items.findIndex((item) =>
                item.id === newItems.id &&
                item.sizes === newItems.sizes &&
                item.colors === newItems.colors);
            if (index >= 0) {
                state.items[index].quantity += newItems.quantity;
            }else {
                state.items.unshift(newItems);
            }

            localStorage.setItem("cart", JSON.stringify(state.items));
        }
    },
});
export const {showMiniCart, hideMiniCart, setQuantity, removeCart, addToCart } = cartSlice.actions;
export default cartSlice.reducer;