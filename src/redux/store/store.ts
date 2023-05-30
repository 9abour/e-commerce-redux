import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../slices/fetchProductsSlice";
import searchSlice from "../slices/searchSlice";

export const store = configureStore({
	reducer: {
		productsSlice,
		searchSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
