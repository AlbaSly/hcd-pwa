import { useEffect, useState } from "react";
import BottomNavbarItem from "./BottomNavbarItem";
import { navbarItems } from "../../../constants/navbarItems";
import { Location } from "react-router-dom";

type BottomNavbarProps = {
	location: Location<any>;
};
export const BottomNavbar = (props: BottomNavbarProps) => {
	const { location } = props;

	const [items, setItems] = useState<any[]>([]);

	useEffect(() => {
		const loadItems = () => {
			setItems([...navbarItems]);
		};

		loadItems();
	}, []);

	return (
		<>
			<div
				className="lg:hidden w-full bg-white z-5 fixed bottom-0 left-0 right-0 p-2 shadow-3 flex flex-col align-items-center justify-content-center"
				style={{ height: "80px" }}
			>
				<nav className="flex w-full justify-content-evenly">
					{items.map((item, index) => (
						<BottomNavbarItem key={index} item={item} location={location} />
					))}
				</nav>
			</div>
		</>
	);
};
