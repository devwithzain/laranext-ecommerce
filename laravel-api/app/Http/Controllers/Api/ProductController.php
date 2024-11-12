<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::get();
        if ($products->count() > 0) {
            return response()->json([
                'products' => $products
            ], 200);
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
            $name = $request->name;
            $category = $request->category;
            $subCategory = $request->subCategory;
            $shortDescription = $request->shortDescription;
            $longDescription = $request->longDescription;
            $isFeatured = $request->isFeatured;
            $isArchived = $request->isArchived;
            $topBrands = $request->topBrands;
            $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();

            Storage::disk('public')->put($imageName, file_get_contents($request->image));

            Product::create([
                'name' => $name,
                'image' => $imageName,
                'category' => $category,
                'subCategory' => $subCategory,
                'shortDescription' => $shortDescription,
                'longDescription' => $longDescription,
                'isFeatured' => $isFeatured,
                'isArchived' => $isArchived,
                'topBrands' => $topBrands,
            ]);

            return response()->json([
                'success' => "Product successfully created. '$name' -- '$imageName' -- '$category' -- '$subCategory' -- '$shortDescription' -- '$longDescription' -- '$isFeatured' -- '$isArchived' -- '$topBrands'",
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong!"
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
            'product' => $product
        ], 200);
    }
    public function update(Request $request, string $id)
    {
        try {
            // Find product
            $product = Product::find($id);
            if (!$product) {
                return response()->json([
                    'message' => 'Product Not Found.'
                ], 404);
            }

            echo "request : $request->image";
            $product->name = $request->name;

            if ($request->image) {

                // Public storage
                $storage = Storage::disk('public');

                // Old iamge delete
                if ($storage->exists($product->image))
                    $storage->delete($product->image);

                // Image name
                $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
                $product->image = $imageName;

                // Image save in public folder
                $storage->put($imageName, file_get_contents($request->image));
            }

            // Update Product
            $product->save();

            // Return Json Response
            return response()->json([
                'message' => "Product successfully updated."
            ], 200);

        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
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