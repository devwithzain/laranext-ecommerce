<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Validator;

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
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'subCategory' => 'required|string',
            'shortDescription' => 'required|string',
            'longDescription' => 'required|string',
            'image' => 'required|string',
            'isFeatured' => 'required|boolean',
            'isArchived' => 'required|boolean',
            'topBrands' => 'required|boolean',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }
        $product = Product::create([
            'name' => $request->name,
            'category' => $request->category,
            'subCategory' => $request->subCategory,
            'shortDescription' => $request->shortDescription,
            'longDescription' => $request->longDescription,
            'image' => $request->image,
            'isFeatured' => $request->isFeatured,
            'isArchived' => $request->isArchived,
            'topBrands' => $request->topBrands,
        ]);
        return response()->json([
            'success' => 'Product created successfully',
            "data" => new ProductResource($product)
        ], );
    }
    public function show(string $uuid)
    {
        $product = Product::find($uuid);
        if (!$product) {
            return response()->json([
                'error' => 'Product Not Found.'
            ], 404);
        }

        return response()->json([
            'product' => $product
        ], 200);
    }
    public function update(Request $request, string $uuid)
    {
        try {
            $product = Product::where('uuid', $uuid)->first();
            if (!$product) {
                return response()->json([
                    'error' => 'Product Not Found.'
                ], 404);
            }

            $product->name = $request->input('name');
            $product->save();

            return response()->json([
                'success' => "Product successfully updated."
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => "Something went wrong!"
            ], 500);
        }
    }
    public function destroy(string $uuid)
    {
        $product = Product::find($uuid);
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