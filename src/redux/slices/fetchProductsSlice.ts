import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";

const API_URL = "https://dummyjson.com/products";

export const fetchProducts = createAsyncThunk(
	"products/productsSlice",
	async () => {
		try {
			const { data } = await axios.get(API_URL);
			return data.products;
		} catch {
			console.log(Error);
		}
	}
);

export const productsSlice = createSlice({
	name: "products",
	initialState: {},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			return (state = action.payload);
		});
	},
});

export default productsSlice.reducer;
