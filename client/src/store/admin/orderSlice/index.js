import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    orderList: [],
    orderDetails: null,
    isLoading: false,
}

export const getAllOrdersForAdmin = createAsyncThunk('order/getOrdersForAdmin', async () => {
    const response = await axios.get(`mern-e-commerce-deploy-to-render-gdat-848mn2u9c.vercel.app/api/admin/order/get`);
    return response.data;
});

export const getOrdersDetailsForAdmin = createAsyncThunk('order/getOrderDetailsForAdmin', async (id) => {
    const response = await axios.get(`mern-e-commerce-deploy-to-render-gdat-848mn2u9c.vercel.app/api/admin/order/details/${id}`);
    
    return response.data;
});


export const updateOrderStatus = createAsyncThunk("ordre/updateOrderStatus", async ({id, orderStatus}) => {
    const response = await axios.put(`mern-e-commerce-deploy-to-render-gdat-848mn2u9c.vercel.app/api/admin/order/update/${id}`, {orderStatus});
    return response.data;
})
const orderSliceForAdmin = createSlice({
    name: "adminOrderSlice",
    initialState,
    reducers: {
        resetOrderDetailsForAdmin: (state) => {
            state.orderDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrdersForAdmin.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
            state.orderList = action.payload.data;
            state.isLoading = false;
        })
        .addCase(getAllOrdersForAdmin.rejected, (state) => {
            state.orderList = [];
            state.isLoading = false;
        })
        .addCase(getOrdersDetailsForAdmin.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getOrdersDetailsForAdmin.fulfilled, (state, action) => {
            state.orderDetails = action.payload.data;
            state.isLoading = false;
        })
        .addCase(getOrdersDetailsForAdmin.rejected, (state) => {
            state.orderDetails = null;
            state.isLoading = false;
        })
    }
});


export const { resetOrderDetailsForAdmin } = orderSliceForAdmin.actions;
export default orderSliceForAdmin.reducer;