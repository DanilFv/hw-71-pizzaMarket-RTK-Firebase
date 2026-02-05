import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface CartSlice {
    cart: ICartDish[];
}

export const initialState: CartSlice = {
    cart: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = [];
        },
        addToCart: (state, action: PayloadAction<IDish>) => {
            const dish = action.payload;

            const findDish = state.cart.find(cartItem => dish.id === cartItem.id);

            if (findDish) {
               findDish.count += 1;
            } else {
                state.cart.push({...dish, count: 1});
            }
        },
        deleteFromCart: (state, action: PayloadAction<ICartDish>) => {
            const dish= action.payload;
            const findDish = state.cart.find(cartItem => cartItem.id === dish.id);

            if (findDish && findDish.count > 1) {
                findDish.count -= 1;
            } else {
               state.cart = state.cart.filter(cartItem => cartItem.id !== dish.id);
            }
        }
    }
});

export const {clearCart, addToCart, deleteFromCart} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;