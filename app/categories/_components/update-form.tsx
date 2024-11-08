"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Navbar, Sidebar } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, TcategoryProps } from "@/schemas";

export default function UpdateForm({ response }: any) {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<TcategoryProps>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: response?.category.name || "",
		},
	});

	const onSubmits = async (data: TcategoryProps) => {
		await axios
			.patch(
				`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/categories${response.category.uuid}`,
				data,
			)
			.then((response) => {
				if (response?.data?.success) {
					toast.success(response.data.success);
					router.push("/categories");
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
							Edit Category
						</h1>
					</div>
					<form
						onSubmit={handleSubmit(onSubmits)}
						className="w-full flex flex-col gap-4">
						<div className="relative w-fit flex flex-col gap-3">
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
