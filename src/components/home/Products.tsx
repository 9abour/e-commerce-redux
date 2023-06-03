"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/slices/fetchProductsSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { productType } from "../../../types";
import Link from "next/link";
import { MdAddCircleOutline, MdCheckCircleOutline } from "react-icons/md";
import { API_URL } from "../../../constants";
import { addToCart } from "@/redux/slices/cartSlice";

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

	useEffect(() => {}, []);

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
							<Link href={`products/product/${item.id}`}>
								<Image
									src={item.thumbnail}
									width={300}
									height={300}
									alt={item.title}
									loading="lazy"
									className="product-image"
								/>
							</Link>
							<div className="flex justify-between items-center">
								<h3 className="title">{item.title}</h3>
								<span className="price">{item.price}$</span>
							</div>
							<p className="description">{item.description}</p>
							<button
								onClick={() => {
									dispatch(addToCart(item));
								}}
								className="btn cart"
							>
								<MdAddCircleOutline size={20} />
								Cart
							</button>
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
