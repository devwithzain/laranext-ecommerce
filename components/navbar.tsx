export default function Navbar() {
	return (
		<div className="px-8 py-6">
			<div className="w-full flex items-center justify-between gap-3">
				<h1 className="text-[24px] font-Poppins font-semibold uppercase text-[#081226]">
					Dashboard
				</h1>
				<button className="text-[14px] font-Poppins font-semibold bg-[#081226] text-white py-2 px-4 rounded-lg hover:bg-[#081226] hover:text-white">
					LogOut
				</button>
			</div>
			<hr className="bg-black text-black w-full mt-2" />
		</div>
	);
}
