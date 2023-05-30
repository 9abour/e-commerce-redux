"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import fetchCategoryProducts from "@/redux/slices/fetchCategoryProducts";
import { fetchProducts } from "@/redux/slices/fetchProductsSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const dispatch = useAppDispatch();
	const products = useAppSelector(state => state.productsSlice);

	async function getCategories() {
		const { data } = await axios.get(
			"https://dummyjson.com/products/categories"
		);
		setCategories(data);
	}

	useEffect(() => {
		getCategories();
		dispatch(fetchProducts());
	}, []);

	return (
		<div className="container mt-8">
			<div>
				<ul className="flex gap-4">
					<li className="category-btn active">All Products</li>
					<li className="category-btn">tops</li>
					<li className="category-btn">smartphones</li>
					<li className="category-btn">laptops</li>
				</ul>
			</div>
			<div className="flex flex-wrap"></div>
		</div>
	);
};

export default Categories;
