import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  addresses: [],
  loading: false,
};

export const fetchAddresses = createAsyncThunk("address/fetchAddresses", async ( userId ) => {
    const response = await axios.get(`https://mern-e-commerce-deploy-to-render.vercel.app/api/shop/address/get/${userId}`);
    
    return response?.data;
})

export const addAddress = createAsyncThunk("address/addAddress", async (formData) => {
    
    const response = await axios.post(`https://mern-e-commerce-deploy-to-render.vercel.app/api/shop/address/add`, formData);
    return response?.data;
});
export const updateAddress = createAsyncThunk("address/updateAddress", async ({ userId, addressId, formData }) => {
    
    const response = await axios.put(`https://mern-e-commerce-deploy-to-render.vercel.app/api/shop/address/update/${userId}/${addressId}`, formData, {
        withCredentials: true,
    });
    return response?.data;
});
export const deleteAddress = createAsyncThunk("address/deleteAddress", async ({ userId, addressId, formData}) => {    
    const response = await axios.delete(`https://mern-e-commerce-deploy-to-render.vercel.app/api/shop/address/delete/${userId}/${addressId}`, formData);
    return response?.data;
});

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAddresses.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAddresses.fulfilled, (state, action) => {
            state.loading = false;
            state.addresses = action.payload.data;
        })
        .addCase(fetchAddresses.rejected, (state) => {
            state.loading = false;
            state.addresses = [];
        }).addCase(addAddress.pending, (state) => {
            state.loading = true;
        })
        .addCase(addAddress.fulfilled, (state) => {
            state.loading = false;
            
        })
        .addCase(addAddress.rejected, (state) => {
            state.loading = false;
            state.addresses = [];
        }).addCase(updateAddress.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateAddress.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(updateAddress.rejected, (state) => {
            state.loading = false;
            state.addresses = [];
        }).addCase(deleteAddress.pending, (state) => {
            state.loading = true;
        }).addCase(deleteAddress.fulfilled, (state) => {
            state.loading = false;
        }).addCase(deleteAddress.rejected, (state) => {
            state.loading = false;
            state.addresses = [];
        })
    }
})

export default addressSlice.reducer;