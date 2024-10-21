import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    images: []
}

export const getFeatureImages = createAsyncThunk("feature/getFeatureImages", async ( ) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/features/get`);
    return response.data;
})

export const addFeatureImage = createAsyncThunk("feature/getFeatureImages", async ( image ) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/features/add`, {image});
    return response.data;
})

const featureSlice = createSlice({
    name: 'featureSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFeatureImages.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getFeatureImages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.images = action.payload.data
        })
        builder.addCase(getFeatureImages.rejected, (state) => {
            state.isLoading = false;
            state.images = [];
        })
    }
})


export default featureSlice.reducer