/**
 * Slice de Redux para Productos Favoritos (Likes)
 * Maneja el sistema de "me gusta" en productos
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LikesState } from '../types';

const initialState: LikesState = {
  likedProducts: [],
};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    // Agrega o quita un producto de favoritos
    toggleLike: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const index = state.likedProducts.indexOf(productId);
      
      if (index > -1) {
        state.likedProducts.splice(index, 1); // Quitar like
      } else {
        state.likedProducts.push(productId);   // Agregar like
      }
    },
    // Carga likes desde localStorage al iniciar la app
    loadLikes: (state, action: PayloadAction<number[]>) => {
      state.likedProducts = action.payload;
    },
    // Limpia todos los likes
    clearLikes: (state) => {
      state.likedProducts = [];
    },
  },
});

export const { toggleLike, loadLikes, clearLikes } = likesSlice.actions;
export default likesSlice.reducer;