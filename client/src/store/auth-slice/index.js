import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
}

export const registerUser = createAsyncThunk("/auth/register",
    async (formData, { rejectWithValue }) => {
        
        try {
            const response = await axios.post(`https://mern-e-commerce-deploy-to-rende-git-530183-moaz-gazers-projects.vercel.app/api/auth/register`, formData, { withCredentials: true });
            return response.data;
        }catch(error) {
            return rejectWithValue(error.response.data);
        }
    }
)
export const checkAuth = createAsyncThunk("/auth/check-auth",
    async () => {
        try {
            const response = await axios.get(
                `https://mern-e-commerce-deploy-to-rende-git-530183-moaz-gazers-projects.vercel.app/api/auth/check-auth`,
                { 
                    withCredentials: true,
                    headers:{
                        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' 
                    }
                }
            );
            return response.data;
        }catch(error) {
            return error?.response?.data;
        }
    }
)
export const loginUser = createAsyncThunk("/auth/login",
    async (formData, { rejectWithValue}) => {
        try {
            const response = await axios.post(`https://mern-e-commerce-deploy-to-rende-git-530183-moaz-gazers-projects.vercel.app/api/auth/login`, formData, { withCredentials: true });
            return response.data;
        }catch(error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const logoutUser = createAsyncThunk("/auth/logout", 

    async () => {
        try {
            const response = await axios.post(`https://mern-e-commerce-deploy-to-rende-git-530183-moaz-gazers-projects.vercel.app/api/auth/logout`, {}, { withCredentials: true });
            return response?.data;
        }catch(error) {
            return error?.response?.data;
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    }, 
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
        .addCase(registerUser.rejected, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = action?.payload?.success ? true : false;
            state.user = action?.payload?.success ? action?.payload?.user : null;
        })
        .addCase(loginUser.rejected, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
        .addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = action?.payload?.success;
            state.user = action?.payload?.success ? action?.payload?.user : null;
        })
        .addCase(checkAuth.rejected, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        }).addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
        
    }
});


export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;