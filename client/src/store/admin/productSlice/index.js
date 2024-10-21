import axios from "axios";

import { createSlice, createAsyncThunk }from "@reduxjs/toolkit";

export const addNewProduct = createAsyncThunk("/products/addNewProduct", async (FormData) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/add`, FormData, {
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response?.data;
})


export const editProduct = createAsyncThunk("/products/editProduct", async ({id, FormData}) => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`, FormData, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response?.data;
});

export const fetchProducts = createAsyncThunk("/products/fetchProducts", async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/get`);
    return response?.data;
})

export const deleteProduct = createAsyncThunk("/products/delete", async (id) => {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`);

    return response.data;
})


const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState: {
        products: [],
        isLoading: false,
    }, 
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload.data;
        }).addCase(fetchProducts.rejected, (state) => {
            state.isLoading = false;
            state.products = [];
        })
    }

})


export default AdminProductsSlice.reducer;