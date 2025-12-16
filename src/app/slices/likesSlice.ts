import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LikesState } from '../types';

const initialState: LikesState = {
  likedProducts: [],
};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const index = state.likedProducts.indexOf(productId);
      
      if (index > -1) {
        state.likedProducts.splice(index, 1);
      } else {
        state.likedProducts.push(productId);
      }
    },
    loadLikes: (state, action: PayloadAction<number[]>) => {
      state.likedProducts = action.payload;
    },
    clearLikes: (state) => {
      state.likedProducts = [];
    },
  },
});

export const { toggleLike, loadLikes, clearLikes } = likesSlice.actions;
export default likesSlice.reducer;