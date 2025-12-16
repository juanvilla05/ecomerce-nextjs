/**
 * Store Global de Redux
 * Centraliza el estado de la aplicación (carrito y likes)
 */
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import likesReducer from './slices/likesSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,   // Estado del carrito de compras
    likes: likesReducer, // Estado de productos favoritos
  },
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;