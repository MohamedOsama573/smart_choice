import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAmazonLaptops = createAsyncThunk(
  '/getamazonlaptops',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}api/v1/products/all-amazon-laptop?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
