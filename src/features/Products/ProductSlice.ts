import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../Products/Types";

interface ProductState {
  items: Product[];
}

const initialState: ProductState = {
  items: [
    { id: "1", name: "Bread", price: 1.10 },
    { id: "2", name: "Milk", price: 0.50 },
    { id: "3", name: "Cheese", price: 0.90 },
    { id: "4", name: "Soup", price: 0.60 },
    { id: "5", name: "Butter", price: 1.20 },
    
  ],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productSlice.reducer;
