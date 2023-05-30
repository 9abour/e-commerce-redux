"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { RxDot, RxDotFilled } from "react-icons/rx";

const Banner = () => {
	const [product, setProduct] = useState({
		id: 1,
		title: "iPhone 9",
		description: "An apple mobile which is nothing like apple",
		price: 549,
		discountPercentage: 12.96,
		rating: 4.69,
		stock: 94,
		brand: "Apple",
		category: "smartphones",
		thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/1/1.jpg",
			"https://i.dummyjson.com/data/products/1/2.jpg",
			"https://i.dummyjson.com/data/products/1/3.jpg",
			"https://i.dummyjson.com/data/products/1/4.jpg",
			"https://i.dummyjson.com/data/products/1/thumbnail.jpg",
		],
	});

	const [imageToShow, setImageToShow] = useState<number>(-1);

	const handleSelectImage = (e: string) => {
		if (e == "right" && imageToShow < product.images.length - 1) {
			setImageToShow(prev => prev + 1);
		} else if (e == "left" && imageToShow > -1) {
			setImageToShow(prev => prev - 1);
		}
	};

	return (
		<div className="w-full h-[40rem] bg-gray-200 flex flex-col justify-center">
			<div className="container flex flex-col-reverse lg:flex-row items-center gap-4 p-4">
				<div className="w-full lg:w-2/4">
					<h1 className="text-4xl font-semibold">{product.title}</h1>
					<p className="text-gray-500">{product.description}</p>
					<Link
						href={`product/${product.id}`}
						className="btn-outline btn border-gray-900 rounded-md mt-4 h-2 !min-h-[30px] !text-gray-900"
					>
						Details
					</Link>
				</div>
				<div className="w-full">
					<div className="relative aspect-video w-full">
						<Image
							className="w-full h-full object-cover rounded-md"
							priority
							quality={20}
							width={400}
							height={400}
							src={
								imageToShow < 0
									? product.thumbnail
									: product.images[imageToShow]
							}
							alt=""
						/>
						<div className="absolute w-full top-2/4 translate-y-[-50%] flex justify-between px-3">
							<button
								onClick={() => handleSelectImage("left")}
								className="arrow-btn main-btn"
							>
								<GoArrowLeft />
							</button>
							<button
								onClick={() => handleSelectImage("right")}
								className="arrow-btn main-btn"
							>
								<GoArrowRight />
							</button>
						</div>
					</div>
					<div className="w-full flex justify-center mt-4">
						<>
							<button onClick={() => setImageToShow(-1)}>
								{imageToShow == -1 ? (
									<RxDotFilled size={30} />
								) : (
									<RxDot size={30} />
								)}
							</button>
							{product.images.map((_, index) => (
								<button key={index} onClick={() => setImageToShow(index)}>
									{imageToShow == index ? (
										<RxDotFilled size={30} />
									) : (
										<RxDot size={30} />
									)}
								</button>
							))}
						</>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
