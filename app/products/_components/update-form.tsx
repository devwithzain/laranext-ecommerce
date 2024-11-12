"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { homePageAboutSchema, TpageAboutSectionData } from "@/schemas";
import { Navbar, Sidebar } from "@/components";

export default function UpdateForm({ response }: any) {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<TpageAboutSectionData>({
		resolver: zodResolver(homePageAboutSchema),
		defaultValues: {
			name: response?.product.name || "",
			category: response?.product.category || "",
			subCategory: response?.product.subCategory || "",
			shortDescription: response?.product.shortDescription || "",
			longDescription: response?.product.longDescription || "",
			image: response?.product.image || "",
			isArchived: response?.product.isArchived || false,
			isFeatured: response?.product.isFeatured || false,
			topBrands: response?.product.topBrands || false,
		},
	});

	const onSubmits = async (data: TpageAboutSectionData) => {
		await axios
			.patch(
				`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/products/${response.product.id}`,
				data,
			)
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
							Edit Product
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
										placeholder=" "
										type="text"
										className="peer p-2  pt-6 w-full font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70"
									/>
									<label className="absolute text-sm duration-150 tracking-tight leading-tight  transform -translate-y-3 top-5 z-10 left-0 pl-4 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
										Name
									</label>
									{errors.name && (
										<span className="text-red-500">{errors.name.message}</span>
									)}
								</div>
							</div>
							<div className="relative w-full">
								<input
									{...register("category")}
									placeholder=" "
									type="text"
									className="peer p-2  pt-6 w-full font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70"
								/>
								<label className="absolute text-sm duration-150 tracking-tight leading-tight  transform -translate-y-3 top-5 z-10 left-0 pl-4 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
									Category
								</label>
								{errors.category && (
									<span className="text-red-500">
										{errors.category.message}
									</span>
								)}
							</div>
							<div className="relative w-full">
								<input
									{...register("subCategory")}
									placeholder=" "
									type="text"
									className="peer p-2  pt-6 w-full font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70"
								/>
								<label className="absolute text-sm duration-150 tracking-tight leading-tight  transform -translate-y-3 top-5 z-10 left-0 pl-4 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
									Sub Category
								</label>
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
									placeholder=" "
									type="text"
									className="peer p-2  pt-6 w-full font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70"
								/>
								<label className="absolute text-sm duration-150 tracking-tight leading-tight  transform -translate-y-3 top-5 z-10 left-0 pl-4 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
									Short Description
								</label>
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
								placeholder=" "
								type="text"
								className="peer p-2  pt-6 w-full font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70"
							/>
							<label className="absolute text-sm duration-150 tracking-tight leading-tight  transform -translate-y-3 top-5 z-10 left-0 pl-4 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
								Long Description
							</label>
							{errors.longDescription && (
								<span className="text-red-500">
									{errors.longDescription.message}
								</span>
							)}
						</div>
						<div className="w-full flex items-center gap-2">
							<div className="relative w-full bg-white border-2 rounded-md outline-none">
								<div className="flex flex-row items-start space-x-3 p-4">
									<input
										type="checkbox"
										{...register("topBrands")}
										className="w-5 h-5 cursor-pointer"
									/>
									<div className="space-y-1 leading-none">
										<label className="text-sm font-medium">Top Brands</label>
										<p className="text-xs text-gray-500">Top Products Brand</p>
									</div>
								</div>
								{errors.topBrands && (
									<span className="text-red-500">
										{errors.topBrands.message}
									</span>
								)}
							</div>
							<div className="relative w-full bg-white border-2 rounded-md outline-none">
								<div className="flex flex-row items-start space-x-3 p-4">
									<input
										type="checkbox"
										{...register("isFeatured")}
										className="w-5 h-5 cursor-pointer"
									/>
									<div className="space-y-1 leading-none">
										<label className="text-sm font-medium">Featured</label>
										<p className="text-xs text-gray-500">
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
							<div className="relative w-full bg-white border-2 rounded-md outline-none">
								<div className="flex flex-row items-start space-x-3 p-4">
									<input
										type="checkbox"
										{...register("isArchived")}
										className="w-5 h-5 cursor-pointer"
									/>
									<div className="space-y-1 leading-none">
										<label className="text-sm font-medium">Archived</label>
										<p className="text-xs text-gray-500">
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
								placeholder=" "
								type="text"
								className="peer p-2  pt-6 w-fit font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70"
							/>
							<label className="absolute text-sm duration-150 tracking-tight leading-tight  transform -translate-y-3 top-5 z-10 left-0 pl-4 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
								Upload Images
							</label>
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
