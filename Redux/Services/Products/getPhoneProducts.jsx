import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPhoneProducts = createAsyncThunk('/getphoneproducts',async({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BASEURL}api/v1/mobiles/amazon-mobile?page=${page}&limit=${limit}`, {
            headers: {
                Authorization : `abdelrahman ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message || "Something went wrong");
    }
})