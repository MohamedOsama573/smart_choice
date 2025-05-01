import { createSlice } from "@reduxjs/toolkit";
import { getAmazonLaptops } from "../Services/Products/getLaptopsProducts";
import { getPhoneProducts } from "../Services/Products/getPhoneProducts";

const productSlice = createSlice({
  name: "products", 
    initialState: {
        AmazonLaptopsProducts: [],
        phoneProducts : [],
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
            })
            .addCase(getPhoneProducts.pending,(state)=>{
                state.ProductsLoading = true;
                state.ProductError = null;
            })
            .addCase(getPhoneProducts.fulfilled,(state,action)=>{
                state.ProductsLoading = false;
                state.phoneProducts = action.payload.products;
            })
            .addCase(getPhoneProducts.rejected,(state,action)=>{
                state.ProductsLoading = false;
                state.ProductError = action.payload;
            });
    },
});
export default productSlice.reducer;