"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart } from "@/redux/slices/cartSlice";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";

const Cart = () => {
	const cartProducts = useAppSelector(state => state.cartSlice.products);
	const dispatch = useAppDispatch();

	return (
		<div className="mt-8">
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
					{/* head */}
					<thead>
						<tr>
							<th>Product</th>
							<th className="hidden md:table-cell">Info</th>
							<th>Price</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{cartProducts.length != 0 &&
							cartProducts.map(item => (
								<tr key={item.id}>
									<td>
										<div className="flex items-center space-x-3">
											<div className="avatar">
												<div className="mask mask-squircle w-12 h-12">
													<img
														src={item.thumbnail}
														alt="Avatar Tailwind CSS Component"
													/>
												</div>
											</div>
											<div>
												<div className="font-bold w-full">{item.title}</div>
												<div className="text-sm opacity-50">{item.brand}</div>
											</div>
										</div>
									</td>
									<td className="max-w-[12rem] text-ellipsis overflow-hidden hidden md:table-cell">
										{item.description}
										<br />
										<span className="badge badge-ghost badge-sm">Apple</span>
									</td>
									<td>160$</td>
									<th>
										<button className="btn btn-ghost btn-xs">
											<IoMdAddCircle size={20} />
										</button>
										<button className="btn btn-ghost btn-xs">
											<IoMdRemoveCircle size={20} />
										</button>
									</th>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Cart;
