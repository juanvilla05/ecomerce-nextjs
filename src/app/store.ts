import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import likesReducer from './slices/likesSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    likes: likesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;