import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/lib/store/slices/api-slice";
import cartReducer from "@/lib/store/slices/cart-slice";
import searchReducer from "@/lib/store/slices/search-slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// ✅ Typed hooks helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
