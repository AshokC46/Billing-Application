import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../Products/Types";

interface ProductState {
  items: Product[];
}

const initialState: ProductState = {
  items: [
    { id: "1", name: "Bread", price: 40 },
    { id: "2", name: "Milk", price: 100 },
    { id: "3", name: "Cheese", price: 300 },
    { id: "4", name: "Cool Drinks", price: 200 },
    { id: "5", name: "Chocolates", price: 300 },
    { id: "6", name: "Butter", price: 450 },
    { id: "7", name: "Ice Cream", price: 80 },
  ],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productSlice.reducer;
