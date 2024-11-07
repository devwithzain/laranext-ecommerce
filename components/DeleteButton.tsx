"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id, path }: { id: any; path: string }) {
	const router = useRouter();
	const deletePost = async (id: any) => {
		try {
			await axios.delete(`${path}`, {
				data: {
					id,
				},
			});
		} catch (error: any) {
			toast.error("Error", error);
		} finally {
			router.refresh();
			toast.success("Deleted");
		}
	};

	return (
		<Link
			href=""
			className="text-[16px] cursor-pointer font-Poppins font-medium bg-[#081226] text-white px-4 py-2 rounded-lg"
			onClick={() => deletePost(id)}>
			Delete
		</Link>
	);
}
