import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosAPI from '../../../axiosAPI.ts';

interface DishesSlice {
    dishes: IDish[];
    oneDish: IDish | null;
    loading: boolean;
    isAddLoading: boolean;
    isDeleteLoading: boolean;
    isOneDishLoading: boolean;
}

export const initialState: DishesSlice = {
    dishes: [],
    oneDish: null,
    loading: false,
    isAddLoading: false,
    isDeleteLoading: false,
    isOneDishLoading: false,
}

export const dishSlice = createSlice({
   name: 'dishes',
   initialState,
   reducers: {

   },

    extraReducers: (builder) => {
       builder.addCase(fetchAllDishes.pending, (state) => {
           state.loading = true;
       });
        builder.addCase(fetchAllDishes.fulfilled, (state, action) => {
           state.loading = false;
           const payload = action.payload;

           if (!payload) {
               state.dishes = [];
               return
           }

           state.dishes = Object.keys(payload).map(dish => {
               return {
                   ...payload[dish],
                   id: dish
               }
           });

       });
         builder.addCase(fetchAllDishes.rejected, (state) => {
           state.loading = false;
       });

          builder.addCase(fetchAddDish.pending, (state) => {
           state.isAddLoading = true;
       });
          builder.addCase(fetchAddDish.fulfilled, (state) => {
              state.isAddLoading = false;
          });
          builder.addCase(fetchAddDish.rejected, (state) => {
              state.isAddLoading = false;
          });

          builder.addCase(fetchEditDish.pending, (state) => {
              state.isOneDishLoading = true;
          });
          builder.addCase(fetchEditDish.fulfilled, (state) => {
              state.isOneDishLoading = false;
          });
          builder.addCase(fetchEditDish.rejected, (state) => {
              state.isOneDishLoading = false;
          });

    }
});


export const fetchAllDishes = createAsyncThunk<IDishApi, void>('/allDishes',
    async () => {
    const response = await axiosAPI.get<IDishApi>('dishes.json');
    return response.data;
});

export const fetchAddDish = createAsyncThunk<void, IDishForm>('/addDish',
    async (data) => {
    await axiosAPI.post('dishes.json', data);
});

export const fetchEditDish = createAsyncThunk<void, IUpdateDish>('/editDish',
    async ({id, dish}) => {
    await axiosAPI.put(`dishes${id}.json`, dish);
});



export const dishReducer = dishSlice.reducer;