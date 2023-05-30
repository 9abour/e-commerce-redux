"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://dummyjson.com/products/category";

export const fetchCategoryProducts = createAsyncThunk(
	"categoryProducts/categoryProductsSlice",
	async (category: string) => {
		try {
			const { data } = await axios.get(`${API_URL}/${category}`);
			return data;
		} catch {
			console.error(Error);
		}
	}
);

export const categoryProductsSlice = createSlice({
	name: "categoryProducts",
	initialState: {},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchCategoryProducts.fulfilled, (state, action) => {
			return (state = action.payload);
		});
	},
});

export default categoryProductsSlice.reducer;
