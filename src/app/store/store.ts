import {configureStore} from '@reduxjs/toolkit';
import {dishReducer} from './DishesSlice.ts';
import {cartReducer} from './CartSlice.ts';

export const store = configureStore({
    reducer: {
        dishes: dishReducer,
        cart: cartReducer,
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;