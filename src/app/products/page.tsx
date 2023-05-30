"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCategoryProducts } from "@/redux/slices/fetchCategoryProducts";
import { fetchProducts } from "@/redux/slices/fetchProductsSlice";
import searchSlice, { searchState } from "@/redux/slices/searchSlice";
import { useEffect } from "react";

const page = () => {
	return (
		<div>
			<h1>Hello</h1>
		</div>
	);
};

export default page;
