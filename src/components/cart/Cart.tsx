"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
	clearCart,
	decrementItem,
	incrementItem,
	removeFromCart,
	setCartProducts,
	setCartProductsToLS,
} from "@/redux/slices/cartSlice";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import Loading from "../Loading";

const Cart = () => {
	const cartProducts = useAppSelector(state => state.cartSlice.products);
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);

	const handleLoading = () => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	};

	// For loading cart products and dispatch it to the state.
	useEffect(() => {
		const cartProductsFromLS = localStorage.getItem("cartProducts");
		if (cartProductsFromLS != null) {
			dispatch(setCartProducts(JSON.parse(cartProductsFromLS)));
		}
		handleLoading();
	}, []);

	// If the user modified the product cart, then update local storage data.
	useEffect(() => {
		dispatch(setCartProductsToLS());
	}, [cartProducts]);

	return (
		<div className="mt-8">
			{!isLoading ? (
				cartProducts.length > 0 ? (
					<>
						<div className="w-full flex p-4">
							<button
								onClick={() => {
									dispatch(clearCart());
								}}
								className="ml-auto hover:text-red-500"
							>
								<AiFillDelete size={25} />
							</button>
						</div>
						<div className="overflow-x-auto px-4">
							<table className="table w-full">
								<thead>
									<tr>
										<th>Product</th>
										<th className="hidden md:table-cell">Info</th>
										<th>Price</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{cartProducts.map(item => (
										<tr
											key={item.product.id}
											className="[&>td]:p-2 [&>th]:p-2 md:[&>td]:p-4"
										>
											<td>
												<div className="flex items-center space-x-3">
													<div className="relative avatar">
														<span className="absolute w-6 h-6 font-semibold bg-blue-500 text-white rounded-full flex justify-center items-center overflow-visible z-50 top-[-3px] left-[-3px]">
															{item.count}
														</span>
														<div className="mask mask-squircle w-12 h-12">
															<img
																src={item.product.thumbnail}
																alt="Avatar Tailwind CSS Component"
															/>
														</div>
													</div>
													<div>
														<div className="font-bold w-full text-xs">
															{item.product.title}
														</div>
														<div className="text-sm opacity-50">
															{item.product.brand}
														</div>
													</div>
												</div>
											</td>
											<td className="max-w-[12rem] text-ellipsis overflow-hidden hidden md:table-cell">
												{item.product.description}
												<br />
												<span className="badge badge-ghost badge-sm">
													Apple
												</span>
											</td>
											<td>{item.count * item.product.price}$</td>
											<th>
												<button
													onClick={() =>
														dispatch(incrementItem(item.product.id))
													}
													className="btn btn-ghost !min-h-[12px] !h-8 px-1"
												>
													<IoMdAddCircle size={20} />
												</button>
												<button
													onClick={() =>
														dispatch(decrementItem(item.product.id))
													}
													className="btn btn-ghost !min-h-[12px] !h-8 px-1"
												>
													<IoMdRemoveCircle size={20} />
												</button>
												<button
													onClick={() =>
														dispatch(removeFromCart(item.product.id))
													}
													className="btn btn-ghost !min-h-[12px] !h-8 px-1 ml-3 text-red-500"
												>
													<AiFillDelete size={20} />
												</button>
											</th>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</>
				) : (
					<h2 className="text-center">Your cart is empty!</h2>
				)
			) : (
				<Loading />
			)}
		</div>
	);
};

export default Cart;
