<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::get();
        if ($categories->count() > 0) {
            return CategoryResource::collection($categories);
        } else {
            return response()->json([
                'status' => 404,
                'error' => 'No Categories Found'
            ], 404);
        }
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }
        $product = Category::create([
            'name' => $request->name,
        ]);
        return response()->json([
            'success' => 'Category created successfully',
            "data" => new CategoryResource($product)
        ], );
    }
    public function show(string $uuid)
    {
        $category = Category::find($uuid);
        if (!$category) {
            return response()->json([
                'error' => 'Category Not Found.'
            ], 404);
        }

        return response()->json([
            'category' => $category
        ], 200);
    }
    public function update(Request $request, string $uuid)
    {
        try {
            $category = Category::where('uuid', $uuid)->first();
            if (!$category) {
                return response()->json([
                    'error' => 'Category Not Found.'
                ], 404);
            }

            $category->name = $request->input('name');
            $category->save();

            return response()->json([
                'success' => "Category successfully updated."
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => "Something went wrong!"
            ], 500);
        }
    }
    public function destroy(string $uuid)
    {
        $category = Category::find($uuid);
        if (!$category) {
            return response()->json([
                'error' => 'Category Not Found.'
            ], 404);
        }

        $category->delete();

        return response()->json([
            'success' => "Category successfully deleted."
        ], 200);
    }
}