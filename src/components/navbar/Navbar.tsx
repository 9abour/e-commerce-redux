"use client";
import React from "react";
import NavLink from "./NavLink";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { BiSearch } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import Link from "next/link";
import SearchModal from "../modals/SearchModal";
import { useAppDispatch } from "@/redux/hooks";
import { searchBtnToggle } from "@/redux/slices/searchSlice";

const Navbar = () => {
	const dispatch = useAppDispatch();

	return (
		<nav className="navbar text-gray-900 bg-white flex-col">
			<Link
				href="/"
				className="gap-1 flex items-center !h-8 min-h-8 px-2 hover:bg-gray-100 rounded-md"
			>
				<SiHomeassistantcommunitystore size={20} />
				<h3 className="text-xl font-semibold uppercase">Store</h3>
			</Link>
			<div className="w-full h-6 flex justify-between items-center px-4">
				<button
					onClick={() => {
						dispatch(searchBtnToggle());
					}}
					className="main-btn"
				>
					<BiSearch />
				</button>
				<SearchModal />
				<ul className="flex justify-center items-center gap-4">
					<NavLink link="products" />
					<NavLink link="categories" />
				</ul>
				<Link href="/cart" className="main-btn">
					<BsCart />
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
