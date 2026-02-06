import type {RootState} from '../store.ts';

export const selectOrder = (state: RootState) => state.orders.orders;
export const selectSendLoading = (state: RootState) => state.orders.sendLoading;
export const selectLoadingOrders = (state: RootState) => state.orders.loading;
export const selectDeleteOrderLoading = (state: RootState) => state.orders.deleteOrderLoading;