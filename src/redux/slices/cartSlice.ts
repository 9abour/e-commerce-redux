import { productType } from "./../../../types.d";
import { createSlice } from "@reduxjs/toolkit";

type productsType = {
	products: productType[];
};

const initialState = {
	products: [],
} as productsType;

const cartSlice = createSlice({
	initialState: initialState,
	name: "cart",
	reducers: {
		addToCart: (state, action) => {
			const newProduct = action.payload;
			if (state.products.length == 0) {
				state.products.push(newProduct);
				localStorage.setItem("cartProducts", JSON.stringify(newProduct));
			} else {
				let isDuplicated = false;

				state.products.map(
					item => item.id == newProduct.id && (isDuplicated = true)
				);

				if (!isDuplicated) {
					state.products.push(newProduct);
					localStorage.setItem("cartProducts", JSON.stringify(state.products));
				}
			}
		},
		removeFromCart: product => {},
		incrementItem: id => {},
		decrementItem: id => {},
		clearCart: state => {
			state.products = [];
		},
	},
});

export default cartSlice.reducer;

export const { addToCart, clearCart } = cartSlice.actions;
