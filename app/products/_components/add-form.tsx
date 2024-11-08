"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Navbar, Sidebar } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { TpageAboutSectionData, homePageAboutSchema } from "@/schemas";

export default function AddForm() {
	const router = useRouter();

	const {
		register,
		reset,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<TpageAboutSectionData>({
		resolver: zodResolver(homePageAboutSchema),
	});

	const onSubmits = async (data: TpageAboutSectionData) => {
		await axios
			.post(`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/products`, data)
			.then((response) => {
				if (response?.data?.success) {
					toast.success(response.data.success);
					router.push("/products");
					router.refresh();
				}
			})
			.catch((err) => {
				if (err.response) {
					toast.error(err.response.data.message);
					reset();
				}
			});
	};

	return (
		<div className="w-full p-4 flex gap-2">
			<Sidebar />
			<div className="w-[82%] h-full ml-auto">
				<Navbar />
				<div className="gap-4 flex flex-col">
					<div className="w-full flex justify-between items-center gap-4">
						<h1 className="text-[40px] text-black  font-semibold">
							Product Details
						</h1>
					</div>
					<form
						onSubmit={handleSubmit(onSubmits)}
						className="w-full flex flex-col gap-4">
						<div className="w-full flex items-center gap-2">
							<div className="relative w-full flex flex-col gap-3">
								<div>
									<input
										{...register("name")}
										placeholder="Name"
										type="text"
										className="text-sm p-4 w-full font-light bg-white border-2 placeholder:text-gray-700 rounded-md outline-none"
									/>
									{errors.name && (
										<span className="text-red-500">{errors.name.message}</span>
									)}
								</div>
							</div>
							<div className="relative w-full">
								<select
									{...register("category")}
									className="text-sm p-4 w-full font-light bg-white border-2 placeholder:text-gray-700 rounded-md outline-none appearance-none pr-10"
									defaultValue="">
									<option
										value=""
										disabled
										hidden>
										Choose a category
									</option>
									<option value="US">United States</option>
									<option value="CA">Canada</option>
									<option value="FR">France</option>
									<option value="DE">Germany</option>
								</select>
								<div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-gray-700"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</div>
								{errors.category && (
									<span className="text-red-500">
										{errors.category.message}
									</span>
								)}
							</div>
							<div className="relative w-full">
								<select
									{...register("subCategory")}
									className="text-sm p-4 w-full font-light bg-white border-2 placeholder:text-gray-700 rounded-md outline-none appearance-none pr-10"
									defaultValue="">
									<option
										value=""
										disabled
										hidden>
										Choose a Sub Category
									</option>
									<option value="US">United States</option>
									<option value="CA">Canada</option>
									<option value="FR">France</option>
									<option value="DE">Germany</option>
								</select>
								<div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-gray-700"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</div>
								{errors.subCategory && (
									<span className="text-red-500">
										{errors.subCategory.message}
									</span>
								)}
							</div>
						</div>
						<div className="w-full flex items-center gap-2">
							<div className="relative w-full">
								<input
									{...register("shortDescription")}
									placeholder="Short Description"
									type="text"
									className="text-sm p-4 w-full font-light bg-white border-2 placeholder:text-gray-700 rounded-md outline-none"
								/>
								{errors.shortDescription && (
									<span className="text-red-500">
										{errors.shortDescription.message}
									</span>
								)}
							</div>
						</div>
						<div className="relative w-full">
							<input
								{...register("longDescription")}
								placeholder="Long Description"
								type="text"
								className="text-sm p-4 w-full font-light bg-white border-2 placeholder:text-gray-700 rounded-md outline-none"
							/>
							{errors.longDescription && (
								<span className="text-red-500">
									{errors.longDescription.message}
								</span>
							)}
						</div>
						<div className="w-full flex items-center gap-2">
							<div className="relative w-full bg-white border-2 placeholder:text-gray-700 rounded-md outline-none">
								<div className="flex flex-row items-start space-x-3 p-4">
									<input
										id="brands"
										type="checkbox"
										{...register("topBrands")}
										className="w-5 h-5 cursor-pointer"
									/>
									<div className="space-y-1 leading-none">
										<label
											htmlFor="brands"
											className="text-sm font-medium text-gray-700">
											Top Brands
										</label>
										<p className="text-xs text-gray-700">Top Products Brand</p>
									</div>
								</div>
								{errors.topBrands && (
									<span className="text-red-500">
										{errors.topBrands.message}
									</span>
								)}
							</div>
							<div className="relative w-full bg-white border-2 placeholder:text-gray-700 rounded-md outline-none">
								<div className="flex flex-row items-start space-x-3 p-4">
									<input
										id="featured"
										type="checkbox"
										{...register("isFeatured")}
										className="w-5 h-5 cursor-pointer"
									/>
									<div className="space-y-1 leading-none">
										<label
											htmlFor="featured"
											className="text-sm font-medium text-gray-700">
											Featured
										</label>
										<p className="text-xs text-gray-700">
											This product will appear on home page in the store.
										</p>
									</div>
								</div>
								{errors.isFeatured && (
									<span className="text-red-500">
										{errors.isFeatured.message}
									</span>
								)}
							</div>
							<div className="relative w-full bg-white border-2 placeholder:text-gray-700 rounded-md outline-none">
								<div className="flex flex-row items-start space-x-3 p-4">
									<input
										id="archived"
										type="checkbox"
										{...register("isArchived")}
										className="w-5 h-5 cursor-pointer"
									/>
									<div className="space-y-1 leading-none">
										<label
											htmlFor="archived"
											className="text-sm font-medium text-gray-700">
											Archived
										</label>
										<p className="text-xs text-gray-700">
											This product will not appear anywhere in the store.
										</p>
									</div>
								</div>
								{errors.isArchived && (
									<span className="text-red-500">
										{errors.isArchived.message}
									</span>
								)}
							</div>
						</div>
						<div className="relative">
							<input
								{...register("image")}
								placeholder="Images"
								type="text"
								className="p-4 text-sm w-fit font-light bg-white border-2 placeholder:text-gray-700 rounded-md outline-none"
							/>
							{errors.image && (
								<span className="text-red-500">{errors.image.message}</span>
							)}
						</div>
						<input
							type="submit"
							value={`${isSubmitting ? "Loading..." : "Create"}`}
							className="w-fit text-[17px] cursor-pointer text-white font-medium bg-[#081226] px-4 py-2 rounded-lg"
							disabled={isSubmitting}
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
