import { createSlice } from "@reduxjs/toolkit";
import { getAmazonLaptops } from "../Services/Products/getAllProducts";

const productSlice = createSlice({
  name: "products", 
    initialState: {
        AmazonLaptopsProducts: [],
        ProductsLoading: false,
        ProductError: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAmazonLaptops.pending, (state) => {
                state.ProductsLoading = true;
                state.ProductError = null;
            })
            .addCase(getAmazonLaptops.fulfilled, (state, action) => {
                state.ProductsLoading = false;
                state.AmazonLaptopsProducts = action.payload.products;
            })
            .addCase(getAmazonLaptops.rejected, (state, action) => {
                state.ProductsLoading = false;
                state.ProductError = action.payload;
            });
    },
});
export default productSlice.reducer;