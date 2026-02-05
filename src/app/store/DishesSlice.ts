import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosAPI from '../../axiosAPI.ts';
import {toast} from 'react-toastify';

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

          builder.addCase(fetchDeleteDish.pending, (state) => {
              state.isDeleteLoading = true;
          });
          builder.addCase(fetchDeleteDish.fulfilled, (state) => {
              state.isDeleteLoading = false;
          });
          builder.addCase(fetchDeleteDish.rejected, (state) => {
              state.isDeleteLoading = false;
          });

           builder.addCase(fetchOneDish.pending, (state) => {
              state.isOneDishLoading = true;
          });
            builder.addCase(fetchOneDish.fulfilled, (state, action) => {
              state.isOneDishLoading = false;
              const payload = action.payload;

              if (payload) state.oneDish = payload;
          });
             builder.addCase(fetchOneDish.rejected, (state) => {
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
    await axiosAPI.put(`dishes/${id}.json`, dish);
});

export const fetchDeleteDish = createAsyncThunk<void, string>('/deleteDish',
    async (id) => {
    await axiosAPI.delete(`dishes/${id}.json`);
    toast.success('Блюдо успешно удалено!');
});

export const fetchOneDish = createAsyncThunk<IDish, string>('/addOneDish',
    async (id) => {
    const response = await axiosAPI<IDish>(`dishes/${id}.json`);
    return response.data;
});



export const dishReducer = dishSlice.reducer;