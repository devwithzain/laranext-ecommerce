import { FaHome } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { BsBriefcaseFill } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";

export const sideBarItem = [
	{
		id: 1,
		title: "Dashboard",
		href: "/",
		icon: <BiSolidDashboard />,
	},
	{
		id: 2,
		title: "Product Management",
		href: "/add-product",
		icon: <FaHome />,
	},
	{
		id: 3,
		title: "Category Management",
		href: "/add-category",
		icon: <BsBriefcaseFill />,
	},
	{
		id: 4,
		title: "Sub Category Management",
		href: "/add-sub-category",
		icon: <IoMdContact />,
	},
];
