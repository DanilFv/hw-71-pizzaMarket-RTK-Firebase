import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {ICartDish, IOrder, IOrderAPI} from '../../../types';
import axiosAPI from '../../../axiosAPI.ts';
import {toast} from 'react-toastify';
import {fetchDeleteDish} from '../Dishes/DishesSlice.ts';

interface OrderSlice {
    loading: boolean;
    sendLoading: boolean;
    deleteOrderLoading: boolean;
    orders: IOrder[];
}

export const initialState: OrderSlice = {
    loading: false,
    sendLoading: false,
    deleteOrderLoading: false,
    orders: [],
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(sendOrder.pending, (state) => {
           state.sendLoading = true;
        });
         builder.addCase(sendOrder.fulfilled, (state) => {
           state.sendLoading = false;
        });
          builder.addCase(sendOrder.rejected, (state) => {
           state.sendLoading = false;
        });

          builder.addCase(fetchOrders.pending, (state) => {
              state.loading = true;
        });
            builder.addCase(fetchOrders.fulfilled, (state, action) => {
              state.loading = false;
              state.orders = action.payload;
        });
              builder.addCase(fetchOrders.rejected, (state) => {
              state.loading = false;
        });
              builder.addCase(fetchDeleteDish.pending, (state) => {
                  state.deleteOrderLoading = true;
        });
              builder.addCase(fetchDeleteDish.fulfilled, (state) => {
                  state.deleteOrderLoading = false;
        });
              builder.addCase(fetchDeleteDish.rejected, (state) => {
                  state.deleteOrderLoading = false;
        });

    }
});

export const sendOrder = createAsyncThunk<void, ICartDish[]>('/sendOrder',
    async (cart) => {
    const dishes: {[key: string]: number} = {};

    cart.forEach((item) => {
        dishes[item.id] = item.count;
    });

    await axiosAPI.post('orders.json', {dishes});
    toast.success('Ваш заказ успешно оформлен!');
});

export const fetchOrders = createAsyncThunk<IOrder[], void>('/allOrders',
    async () => {
    const response = await axiosAPI.get<IOrderAPI>('orders.json');
    const data = response.data;

    if (!data) return [];

    return Object.keys(data).map(item => {
        return {
            id: item,
            ...data[item]
        }
    });
});

export const deleteOrder = createAsyncThunk<void, string>('/deleteOrder',
    async (id) => {
    await axiosAPI.delete(`orders/${id}.json`);
    toast('Ордер успешно завершен!');
});



export const ordersReducer = ordersSlice.reducer;