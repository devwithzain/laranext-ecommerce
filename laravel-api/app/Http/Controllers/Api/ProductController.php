<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\ProductResource;
use function Laravel\Prompts\error;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::get();
        if ($products->count() > 0) {
            return ProductResource::collection($products);
        } else {
            return response()->json([
                'status' => 404,
                'error' => 'No Products Found'
            ], 404);
        }
    }
    public function store(ProductRequest $request)
    {
        try {
            $validated = $request->validated();

            $name = $validated['name'];
            $category = $validated['category'];
            $subCategory = $validated['subCategory'];
            $shortDescription = $validated['shortDescription'];
            $longDescription = $validated['longDescription'];

            $imageName = Str::random(32) . '.' . $request->image->getClientOriginalExtension();
            Storage::disk('public')->put($imageName, file_get_contents($request->image));

            $product = Product::create([
                'name' => $name,
                'image' => $imageName,
                'category' => $category,
                'subCategory' => $subCategory,
                'shortDescription' => $shortDescription,
                'longDescription' => $longDescription,
            ]);

            return response()->json([
                'success' => 'Product successfully created.',
                'data' => new ProductResource($product),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong!',
            ], 500);
        }
    }
    public function show(string $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'error' => 'Product Not Found.'
            ], 404);
        }

        return response()->json([
            'data' => new ProductResource($product),
        ], 200);
    }
    public function update(Request $request, string $id)
    {
        try {
            $product = Product::find($id);
            if (!$product) {
                return response()->json([
                    'message' => 'Product Not Found.'
                ], 404);
            }

            $product->name = $request->name;
            $product->category = $request->category;
            $product->subCategory = $request->subCategory;
            $product->shortDescription = $request->shortDescription;
            $product->longDescription = $request->longDescription;

            if ($request->image) {
                $storage = Storage::disk('public');

                if ($storage->exists($product->image))
                    $storage->delete($product->image);

                $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
                $product->image = $imageName;

                $storage->put($imageName, file_get_contents($request->image));
            }

            $product->save();

            return response()->json([
                'success' => "Product successfully updated.",
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went wrong!",
            ], 500);
        }
    }
    public function destroy(string $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'error' => 'Product Not Found.'
            ], 404);
        }

        $product->delete();

        return response()->json([
            'success' => "Product successfully deleted."
        ], 200);
    }
}