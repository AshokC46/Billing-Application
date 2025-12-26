import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Products/ProductSlice";
import cartReducer from "../features/Cart/CartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
