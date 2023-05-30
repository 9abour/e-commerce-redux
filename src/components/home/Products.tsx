"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/slices/fetchProductsSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { productType } from "../../../types";
import Link from "next/link";

const API_URL = "https://dummyjson.com/products";

const Products = () => {
	const categories = ["all", "tops", "smartphones", "laptops"];

	const [category, setCategory] = useState("all");
	const dispatch = useAppDispatch();
	const products = useAppSelector(state => state.productsSlice.products);

	useEffect(() => {
		if (category == "all") {
			dispatch(fetchProducts(API_URL));
		} else {
			dispatch(fetchProducts(`${API_URL}/category/${category}`));
		}
	}, [category]);

	return (
		<div className="container mt-8">
			<div>
				<ul className="flex gap-4 px-4">
					{categories.map((item, index) => (
						<li
							key={index}
							onClick={() => {
								setCategory(item);
							}}
							className={`category-btn ${item == category ? "active" : ""}`}
						>
							{item}
						</li>
					))}
				</ul>
			</div>
			<div className="flex flex-wrap justify-center gap-2 py-4">
				{products.length != 0 ? (
					products.map((item: productType) => (
						<div key={item.id} className="card">
							<Image
								src={item.thumbnail}
								width={300}
								height={300}
								alt={item.title}
								priority
								className="product-image"
							/>
							<h3 className="title">{item.title}</h3>
							<p className="description">{item.description}</p>
							<Link href={`products/product/${item.id}`} className="btn">
								Details
							</Link>
						</div>
					))
				) : (
					<button className="btn loading bg-transparent border-none">
						loading...
					</button>
				)}
			</div>
		</div>
	);
};

export default Products;
