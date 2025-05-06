import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('https://fakestoreapi.com/products');
    dispatch(setProducts(data));
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
};

export default productSlice.reducer;
