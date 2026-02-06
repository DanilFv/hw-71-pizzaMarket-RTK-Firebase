import {configureStore} from '@reduxjs/toolkit';
import {dishReducer} from './Dishes/DishesSlice.ts';
import {cartReducer} from './Cart/CartSlice.ts';
import {ordersReducer} from './Orders/OrderSlice.ts';


export const store = configureStore({
    reducer: {
        dishes: dishReducer,
        cart: cartReducer,
        orders: ordersReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;