import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import orderSliceForAdmin from "./admin/orderSlice";
import featureSlice from "./common/featureSlice";
import AdminProductsSlice from "./admin/productSlice";
import ShopProductsSlice from "./shop/productsSlice";
import shoppingCartSlice from "./shop/cartSlice";
import addressSlice from "./shop/addressSlice";
import shopOrderSlice from "./shop/orderSlice";  
import searchSlice from "./shop/searchSlice";
import reviewSlice from "./shop/reviewSlice"
const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: AdminProductsSlice,
        adminOrder: orderSliceForAdmin,
        
        shop: ShopProductsSlice,
        cart: shoppingCartSlice,
        address: addressSlice,
        order: shopOrderSlice,
        search: searchSlice,
        review: reviewSlice,
        feature: featureSlice
        // [api.reducerPath]: api.reducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

export default store;