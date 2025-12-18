import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    searchResults: []
}

export const searchProducts = createAsyncThunk  ('search/searchProducts', async (keyword) => {
  const response = await axios.get(`http://localhost:5000/api/shop/search/${keyword}`);
  return response.data
});

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
      resetSearchResults: (state) => {
          state.searchResults = []
      }
  },
  extraReducers: (builder) => {
      builder.addCase(searchProducts.pending, (state) => {
          state.isLoading = true;
      })
      builder.addCase(searchProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.searchResults = action.payload.data;
      })
      builder.addCase(searchProducts.rejected, (state) => {
          state.isLoading = false;
          state.searchResults = [];
      })
  }
})

export const { resetSearchResults } = searchSlice.actions;
export default searchSlice.reducer;