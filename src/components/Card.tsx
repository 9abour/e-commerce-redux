import React from "react";
import { productType } from "../../types";
import { MdAddCircleOutline } from "react-icons/md";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart, setCartProductsToLS } from "@/redux/slices/cartSlice";
import Link from "next/link";
import Image from "next/image";

interface Props {
	product: productType;
}

const Card = (props: Props) => {
	const { id, thumbnail, title, price, description } = props.product;

	const dispatch = useAppDispatch();

	return (
		<div className="card">
			<Link href={`products/${id}`}>
				<Image
					src={thumbnail}
					width={300}
					height={300}
					alt={title}
					loading="lazy"
					className="product-image"
				/>
			</Link>
			<div className="flex justify-between items-center">
				<h3 className="title">{title}</h3>
				<span className="price">{price}$</span>
			</div>
			<p className="description">{description}</p>
			<button
				onClick={() => {
					dispatch(addToCart(props.product));
					dispatch(setCartProductsToLS());
				}}
				className="btn cart"
			>
				<MdAddCircleOutline size={20} />
				Cart
			</button>
		</div>
	);
};

export default Card;
