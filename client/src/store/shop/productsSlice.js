import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchProducts = createAsyncThunk("/products/fetchProducts", 
    async ({filterParams, sortParams}) => {
        const query = new URLSearchParams({...filterParams, sortBy: sortParams});
        console.log(query);
        const response = await axios.get(`/api/shop/products/get?${query}`);
        return response?.data;
    }
)

export const fetchProductDetail = createAsyncThunk("/products/fetchProductDetail", 
    async (id) => {
        const response = await axios.get(`/api/shop/products/get/${id}`);
        return response?.data;
    }
)



const shopProductsSlice = createSlice({
    name: "shopProducts",
    initialState: {
        products: [],
        isLoading: false,
        error: null,
        productDetail: null,
    },
    reducers: {

        setProductDetail: (state) => {
            state.productDetail = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload.data;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        }).addCase(fetchProductDetail.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchProductDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productDetail = action.payload.data;
        })
        .addCase(fetchProductDetail.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})
export const { setProductDetail } = shopProductsSlice.actions;
export default shopProductsSlice.reducer;