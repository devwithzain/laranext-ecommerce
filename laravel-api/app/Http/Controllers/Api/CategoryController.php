<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;

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
    public function store(CategoryRequest $request)
    {
        try {
            $validated = $request->validated();

            $name = $validated['name'];

            $category = Category::create([
                'name' => $name,
            ]);

            return response()->json([
                'success' => 'Category successfully created.',
                'data' => new CategoryResource($category),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong!',
            ], 500);
        }
    }
    public function show(string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'error' => 'Category Not Found.'
            ], 404);
        }

        return response()->json([
            'category' => new CategoryResource($category)
        ], 200);
    }
    public function update(Request $request, string $id)
    {
        try {
            $category = Category::where('id', $id)->first();
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
    public function destroy(string $id)
    {
        $category = Category::find($id);
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