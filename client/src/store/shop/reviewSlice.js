import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState =  {
  isLoading: false,
  reviews: []
}


export const addReview = createAsyncThunk('review/addReview', async (reviewData) => {
  const response = await axios.post(`mern-e-commerce-deploy-to-render-gdat-848mn2u9c.vercel.app/api/shop/review/add`, reviewData);
  return response.data;
});

export const getReviews = createAsyncThunk('review/getReviews', async (productId) => {
  const response = await axios.get(`mern-e-commerce-deploy-to-render-gdat-848mn2u9c.vercel.app/api/shop/review/get/${productId}`);
  return response.data;
});

const reviewSlice = createSlice({
  name: 'reviewSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReviews.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getReviews.fulfilled, (state, action) => {
      state.isLoading = false
      state.reviews = action.payload.data
    })
    .addCase(getReviews.rejected, (state) => {
      state.isLoading = false
      state.reviews = []
    })
  }
})

export default reviewSlice.reducer