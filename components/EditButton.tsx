"use client";
import axios from "axios";
import Link from "next/link";

export default function EditButton({
	id,
	path,
	url,
}: {
	id: any;
	path: string;
	url: string;
}) {
	const editPost = async (id: any) => {
		try {
			await axios.patch(`${path}/${id}`, {
				data: {
					id,
				},
			});
		} catch (error) {
			console.log("Error", error);
		}
	};

	return (
		<Link
			onClick={() => editPost(id)}
			href={`/dashboard/${url}/${id}`}
			className="text-[16px] cursor-pointer font-Poppins font-medium bg-[#081226] text-white px-4 py-2 rounded-lg">
			Edit
		</Link>
	);
}
