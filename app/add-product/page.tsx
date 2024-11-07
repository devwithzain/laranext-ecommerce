import { TproductColumnProps } from "@/types";
import getProducts from "@/actions/get-products";
import { DeleteButton, EditButton, Navbar, Sidebar } from "@/components";

export default async function Product() {
	const products = await getProducts();
	return (
		<div className="w-full p-4 flex gap-2">
			<Sidebar />
			<div className="w-[83%] h-full ml-auto">
				<Navbar />
				<div className="gap-4 flex flex-col px-6">
					<div className="w-full flex justify-between items-center gap-4">
						<div>
							<h1 className="text-[35px] font-Poppins font-medium tracking-tighter leading-tight">
								Products
							</h1>
						</div>
					</div>
					<div className="overflow-x-auto">
						<table className="min-w-full bg-white border border-gray-200">
							<thead>
								<tr>
									<th className="border border-gray-200 px-4 py-2 font-Poppins text-left">
										Name
									</th>
									<th className="border border-gray-200 px-4 py-2 font-Poppins text-left">
										Category
									</th>
									<th className="border border-gray-200 px-4 py-2 font-Poppins text-left">
										Sub Category
									</th>
									<th className="border border-gray-200 px-4 py-2 font-Poppins text-left">
										Short Description
									</th>
									<th className="border border-gray-200 px-4 py-2 font-Poppins text-left">
										Long Description
									</th>
									<th className="border border-gray-200 px-4 py-2 font-Poppins text-left">
										IsFeatured
									</th>
									<th className="border border-gray-200 px-4 py-2 font-Poppins text-left">
										IsArchived
									</th>
									<th className="border border-gray-200 px-4 py-2 font-Poppins text-left">
										Top Brands
									</th>
									<th className="border border-gray-200 px-4 py-2 font-Poppins text-left">
										Image
									</th>
									<th className="border border-gray-200 px-4 py-2 font-Poppins text-left">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{products.data.map((item: TproductColumnProps) => (
									<tr key={item.id}>
										<td className="border border-gray-200 px-4 py-2 font-Poppins w-fit">
											<div>
												<h1 className="text-[15px] text-black font-medium font-sans">
													{item.name}
												</h1>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2 font-Poppins w-fit">
											<div>
												<p className="text-[15px] text-black font-medium font-sans">
													{item.category}
												</p>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2 font-Poppins w-fit">
											<div>
												<p className="text-[15px] text-black font-medium font-sans">
													{item.subCategory}
												</p>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2 font-Poppins w-fit">
											<div>
												<p className="text-[15px] text-black font-medium font-sans">
													{item.shortDescription}
												</p>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2 font-Poppins w-fit">
											<div>
												<p className="text-[15px] text-black font-medium font-sans">
													{item.longDescription}
												</p>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2 font-Poppins w-fit">
											<div>
												<p className="text-[15px] text-black font-medium font-sans">
													{item.isFeatured}
												</p>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2 font-Poppins w-fit">
											<div>
												<p className="text-[15px] text-black font-medium font-sans">
													{item.isArchived}
												</p>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2 font-Poppins w-fit">
											<div>
												<p className="text-[15px] text-black font-medium font-sans">
													{item.topBrands}
												</p>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2 font-Poppins w-fit">
											<div>
												<p className="text-[15px] text-black font-medium font-sans">
													{item.image}
												</p>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2 font-Poppins w-fit">
											<div className="flex items-end justify-end gap-4">
												<EditButton
													id={item.id}
													path="/api/homepage/about"
													url="home/about"
												/>
												<DeleteButton
													id={item.id}
													path="/api/homepage/about"
												/>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
