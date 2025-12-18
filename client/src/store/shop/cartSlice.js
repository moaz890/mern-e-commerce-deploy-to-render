import { createAsyncThunk, createSlice }  from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    cartItems: [],
    isLoading: false
}

export const addToCart = createAsyncThunk("cart/addtocart", async ({ userId, productId, quantity}) => {

    const response = await axios.post(`mern-e-commerce-deploy-to-render-gdat-848mn2u9c.vercel.app/api/shop/cart/add`, {userId, productId, quantity});
    return response.data;

})
export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async ( userId ) => {
    const response = await axios.get(`mern-e-commerce-deploy-to-render-gdat-848mn2u9c.vercel.app/api/shop/cart/get/${userId}`);
    return response.data;
})

export const deleteCartItem = createAsyncThunk("/cart/deletecartitem", async ({ userId, productId }) => {
    const response = await axios.delete(`mern-e-commerce-deploy-to-render-gdat-848mn2u9c.vercel.app/api/shop/cart/${userId}/${productId}`, {} );
    return response.data;

})

export const deleteProduct = createAsyncThunk("/products/delete", async (id) => {
    const response = await axios.delete(`mern-e-commerce-deploy-to-render-gdat-848mn2u9c.vercel.app/api/admin/products/delete/${id}`);

    return response.data;
})

export const updateCartItems = createAsyncThunk("cart/updateCart", async ({ userId, productId, quantity}) => {

    const response = await axios.put(`mern-e-commerce-deploy-to-render-gdat-848mn2u9c.vercel.app/api/shop/cart/update-cart`, {userId, productId, quantity});
    return response.data;

})

const shoppingCartSlice = createSlice({
    name: 'shoppingCartSlice',
    initialState,
    reducers: {},
    extraReducers: ( builder ) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
        }).addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(fetchCartItems.rejected, (state) => {
            state.isLoading = false;
            
        }).addCase(deleteCartItem.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(deleteCartItem.rejected, (state) => {
            state.isLoading = false;
            
        }).addCase(updateCartItems.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(updateCartItems.rejected, (state) => {
            state.isLoading = false;
            
        })
    }
});

export default shoppingCartSlice.reducer;