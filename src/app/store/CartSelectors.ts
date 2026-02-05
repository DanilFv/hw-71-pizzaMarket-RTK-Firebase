import type {RootState} from './store.ts';

export const selectCart = (state: RootState) => state.cart.cart;