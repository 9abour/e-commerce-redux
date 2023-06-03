"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/slices/fetchProductsSlice";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../constants";
import { productType } from "../../../types";
import Link from "next/link";
import Image from "next/image";
import { MdAddCircleOutline } from "react-icons/md";

const page = () => {
	const categories = [
		"smartphones",
		"laptops",
		"fragrances",
		"skincare",
		"groceries",
		"home-decoration",
		"furniture",
		"tops",
		"womens-dresses",
		"womens-shoes",
		"mens-shirts",
		"mens-shoes",
		"mens-watches",
		"womens-watches",
		"womens-bags",
		"womens-jewellery",
		"sunglasses",
		"automotive",
		"motorcycle",
		"lighting",
	];

	const [selectedCategory, setSelectedCategory] = useState("laptops");

	const dispatch = useAppDispatch();
	const products = useAppSelector(state => state.productsSlice.products);

	useEffect(() => {
		dispatch(fetchProducts(`${API_URL}/category/${selectedCategory}`));
	}, [selectedCategory]);

	return (
		<div>
			<div className="flex flex-col justify-center items-center pt-8">
				<select
					onChange={e => {
						setSelectedCategory(e.target.value);
					}}
					defaultValue={"laptops"}
					className="select select-bordered select-sm w-full max-w-xs bg-gray-900"
				>
					{categories.map((item, index) => (
						<option value={item} key={index}>
							{item}
						</option>
					))}
				</select>
				<div className="flex flex-wrap justify-center gap-2 mt-8">
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
								<button className="btn cart">
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
		</div>
	);
};

export default page;
