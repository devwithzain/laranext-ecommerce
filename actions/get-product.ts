const apiUrl = `${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/products`;
const getProduct = async (uuid: string) => {
   const response = await fetch(`${apiUrl}/${uuid}`);
   return response.json();
};

export default getProduct;