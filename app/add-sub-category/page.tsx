import { Navbar, Sidebar } from "@/components";

export default async function Product() {
	return (
		<div className="w-full p-4 flex gap-2">
			<Sidebar />
			<div className="w-[82%] h-full ml-auto">
				<Navbar />
			</div>
		</div>
	);
}
