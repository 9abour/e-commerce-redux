"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/slices/fetchProductsSlice";
import {
	fetchSearchProducts,
	searchBtnToggle,
} from "@/redux/slices/searchSlice";
import React, { FormEvent, useEffect, useState } from "react";
import { CgCloseR } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";

const SearchModal = () => {
	const [inputValue, setInputValue] = useState<string>("");
	const state = useAppSelector(state => state.searchSlice);
	const dispatch = useAppDispatch();
	const { modalIsOpen, results } = state;

	const handleSubmitSearch = (e: FormEvent) => {
		e.preventDefault();
		if (inputValue != "") {
			dispatch(fetchSearchProducts(inputValue));
		}
	};

	if (modalIsOpen) {
		return (
			<div className="absolute w-screen h-screen top-0 left-0 bg-gray-500 bg-opacity-95 z-40">
				<div className="w-full h-full py-8 grid justify-center items-center z-50">
					<div>
						<form
							onSubmit={e => {
								handleSubmitSearch(e);
							}}
							className="w-[300px] md:w-[400px] mx-auto"
						>
							<button
								onClick={() => {
									dispatch(searchBtnToggle());
								}}
								type="button"
								className="block mx-auto mb-3 text-red-300 border border-red-700 bg-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-1 text-center shadow-red-500 shadow-md transition"
							>
								<CgCloseR size={25} />
							</button>
							<div className="flex gap-2">
								<input
									onChange={e => {
										setInputValue(e.target.value);
									}}
									type="text"
									placeholder="Type here"
									className="input w-full text-white shadow-md"
								/>
								<button
									type="submit"
									className="flex justify-center items-center min-h-[48px] min-w-[48px] mx-auto mb-3 bg-blue-700 hover:bg-blue-800 rounded-lg text-sm text-center text-white shadow-md transition"
								>
									<BiSearch size={25} />
								</button>
							</div>
						</form>
						<div className="container mt-4 flex flex-wrap justify-center gap-2">
							{results.length != 0 ? (
								results.map(item => (
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
										<button className="btn">Details</button>
									</div>
								))
							) : (
								<h3>no products.</h3>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	} else return null;
};

export default SearchModal;
