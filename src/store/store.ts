import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/store/slices/api-slice";
import cartReducer from "@/store/slices/cart-slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// ✅ Typed hooks helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
