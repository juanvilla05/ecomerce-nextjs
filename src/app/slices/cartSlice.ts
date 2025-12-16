/**
 * Slice de Redux para el Carrito de Compras
 * Maneja agregar, eliminar y actualizar productos del carrito
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../types';

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Agrega producto o incrementa cantidad si ya existe
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    // Elimina producto del carrito
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // Vacía todo el carrito
    clearCart: (state) => {
      state.items = [];
    },
    // Actualiza la cantidad de un producto específico
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addItem, removeItem, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;