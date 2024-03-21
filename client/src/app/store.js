import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { apiSlice } from '../features/apiSlice';
import authReducer from '../features/authSlice';
import cartReducer from '../features/cartSlice';


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]:apiSlice.reducer,

    cart: cartReducer,
    auth:authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true
});
