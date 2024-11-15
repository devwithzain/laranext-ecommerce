<?php

namespace App\Http\Controllers\Api;

use App\Models\SubCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SubCategoryRequest;
use App\Http\Resources\SubCategoryResource;

class SubCategoryController extends Controller
{
    public function index()
    {
        $subCategories = SubCategory::get();
        if ($subCategories->count() > 0) {
            return SubCategoryResource::collection($subCategories);
        } else {
            return response()->json([
                'status' => 404,
                'error' => 'No SubCategories Found'
            ], 404);
        }
    }
    public function store(SubCategoryRequest $request)
    {
        try {
            $validated = $request->validated();

            $name = $validated['name'];

            $subCategory = SubCategory::create([
                'name' => $name,
            ]);

            return response()->json([
                'success' => 'Sub Category successfully created.',
                'data' => new SubCategoryResource($subCategory),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong!',
            ], 500);
        }
    }
    public function show(string $id)
    {
        $subcategory = SubCategory::find($id);
        if (!$subcategory) {
            return response()->json([
                'error' => 'Sub Category Not Found.'
            ], 404);
        }

        return response()->json([
            'subcategory' => $subcategory,
            'data' => new SubCategoryResource($subcategory),
        ], 200);
    }
    public function update(Request $request, string $id)
    {
        try {
            $subCategory = SubCategory::where('id', $id)->first();
            if (!$subCategory) {
                return response()->json([
                    'error' => 'Sub Category Not Found.'
                ], 404);
            }

            $subCategory->name = $request->input('name');
            $subCategory->save();

            return response()->json([
                'success' => "Sub Category successfully updated."
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => "Something went wrong!"
            ], 500);
        }
    }
    public function destroy(string $id)
    {
        $subCategory = SubCategory::find($id);
        if (!$subCategory) {
            return response()->json([
                'error' => 'Sub Category Not Found.'
            ], 404);
        }

        $subCategory->delete();

        return response()->json([
            'success' => "Sub Category successfully deleted."
        ], 200);
    }
}