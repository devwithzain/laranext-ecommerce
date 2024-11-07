const apiUrl = `${process.env.LARAVEL_BACKEND_API_URL}/products`;
const getProducts = async () => {
   const response = await fetch(apiUrl);
   return response.json();
};

export default getProducts;