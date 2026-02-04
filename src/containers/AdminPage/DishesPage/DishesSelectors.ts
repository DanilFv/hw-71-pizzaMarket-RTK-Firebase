import type {RootState} from '../../../app/store.ts';

export const selectDish = (state: RootState) => state.dishes.dishes
export const selectOneDish = (state: RootState) => state.dishes.oneDish

export const selectLoading = (state: RootState) => state.dishes.loading
export const selectIsAddLoading = (state: RootState) => state.dishes.isAddLoading
export const selectIsDeleteLoading = (state: RootState) => state.dishes.isDeleteLoading
export const selectIsOneLoading = (state: RootState) => state.dishes.isOneDishLoading