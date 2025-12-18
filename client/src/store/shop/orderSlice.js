import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    orderId: null,
    approvalURL: null,
    isLoading: false,
    orderList: [],
    orderDetails: null,
}

export const createOrder = createAsyncThunk('order/createOrder', async (orderData) => {
    const response = await axios.post(`http://localhost:5000/api/shop/order/create`, orderData);
    return response.data;
});

export const capturePayment = createAsyncThunk('order/captureOrder', async ({ paymentId, orderId, payerId }) => {
    const response = await axios.post(`http://localhost:5000/api/shop/order/capture`, { paymentId, orderId, payerId });
    return response.data;
});

export const getAllOrdersByUser = createAsyncThunk('order/getOrderByUser', async (userId) => {
    const response = await axios.get(`http://localhost:5000/api/shop/order/list/${userId}`);
    return response.data;
});

export const getOrdersDetails = createAsyncThunk('order/getOrderDetails', async (id) => {
    const response = await axios.get(`http://localhost:5000/api/shop/order/details/${id}`);
    return response.data;
});


const shopOrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.orderDetails = null;
        }
    },
    extraReducers: (builder) => {
         builder.addCase(createOrder.pending, (state) => {
            state.isLoading = true;
        }).addCase(createOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderId = action.payload.orderId;
            state.approvalURL = action.payload.approvalURL;
            sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId));
        }).addCase(createOrder.rejected, (state) => {
            state.isLoading = false;
            state.approvalURL = null;
            state.orderId = null;
        }).addCase(getAllOrdersByUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllOrdersByUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderList = action.payload.data;
        }).addCase(getAllOrdersByUser.rejected, (state) => {
            state.isLoading = false;
            state.orderList = [];
        }).addCase(getOrdersDetails.pending, (state) => {
            state.isLoading = true;
        }).addCase(getOrdersDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderDetails = action.payload.data;
        }).addCase(getOrdersDetails.rejected, (state) => {
            state.isLoading = false;
            state.orderDetails = null;
        })
    }

});

export const  { resetOrderDetails } = shopOrderSlice.actions;
export default shopOrderSlice.reducer;