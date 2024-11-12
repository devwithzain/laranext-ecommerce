import Link from "next/link";
import { TproductColumnProps } from "@/types";
import getProducts from "@/actions/get-products";
import { DeleteButton, EditButton, Navbar, Sidebar } from "@/components";

export default async function Product() {
	const products = await getProducts();
	return (
		<div className="w-full p-4 flex gap-2">
			<Sidebar />
			<div className="w-[82%] h-full ml-auto">
				<Navbar />
				<div className="gap-4 flex flex-col">
					<div className="w-full flex justify-between items-center gap-4">
						<div>
							<h1 className="text-[35px]  font-medium tracking-tighter leading-tight">
								Products
							</h1>
						</div>
						<Link
							href="/products/add-new"
							className="text-[14px]  font-semibold bg-[#081226] text-white py-2 px-4 rounded-lg">
							Add New
						</Link>
					</div>
					<div className="overflow-x-auto">
						<table className="min-w-full bg-white border border-gray-200">
							<thead>
								<tr>
									<th className="border border-gray-200 px-4 py-2  text-left">
										Name
									</th>
									<th className="border border-gray-200 px-4 py-2  text-left">
										Category
									</th>
									<th className="border border-gray-200 px-4 py-2  text-left">
										Sub Category
									</th>
									<th className="border border-gray-200 px-4 py-2  text-left">
										Short Description
									</th>
									<th className="border border-gray-200 px-4 py-2  text-left">
										Long Description
									</th>
									<th className="border border-gray-200 px-4 py-2  text-left">
										IsFeatured
									</th>
									<th className="border border-gray-200 px-4 py-2  text-left">
										IsArchived
									</th>
									<th className="border border-gray-200 px-4 py-2  text-left">
										Top Brands
									</th>
									<th className="border border-gray-200 px-4 py-2  text-left">
										Created At
									</th>
									<th className="border border-gray-200 px-4 py-2  text-left">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{products?.data.map((item: TproductColumnProps) => (
									<tr key={item.id}>
										<td className="border border-gray-200 px-4 py-2  w-fit">
											<div>
												<h1 className="text-[15px] text-black font-medium ">
													{item.name}
												</h1>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2  w-fit">
											<div>
												<p className="text-[15px] text-black font-medium ">
													{item.category}
												</p>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2  w-fit">
											<div>
												<p className="text-[15px] text-black font-medium ">
													{item.subCategory}
												</p>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2  w-fit">
											<div>
												<p className="text-[15px] text-black font-medium ">
													{item.shortDescription}
												</p>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2  w-fit">
											<div>
												<p className="text-[15px] text-black font-medium ">
													{item.longDescription}
												</p>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2  w-fit">
											<div>
												<p className="text-[15px] text-black font-medium ">
													{item.isFeatured}
												</p>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2  w-fit">
											<div>
												<p className="text-[15px] text-black font-medium ">
													{item.isArchived}
												</p>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2  w-fit">
											<div>
												<p className="text-[15px] text-black font-medium ">
													{item.topBrands}
												</p>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2  w-fit">
											<div>
												<p className="text-[15px] text-black font-medium ">
													{/* {item.image} */}
													new Date()
												</p>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2  w-fit">
											<div className="flex items-end justify-end gap-4">
												<EditButton
													id={item.id}
													path={`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/products`}
													url="products"
												/>
												<DeleteButton
													id={item.id}
													path={`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/products`}
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
