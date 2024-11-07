<?php

namespace App\Http\Controllers\Api;

use App\Models\SubCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
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
        $product = SubCategory::create([
            'name' => $request->name,
        ]);
        return response()->json([
            'success' => 'SubCategory created successfully',
            "data" => new SubCategoryResource($product)
        ], );
    }
    public function show(string $uuid)
    {
        $subcategory = SubCategory::find($uuid);
        if (!$subcategory) {
            return response()->json([
                'error' => 'Sub Category Not Found.'
            ], 404);
        }

        return response()->json([
            'subcategory' => $subcategory
        ], 200);
    }
    public function update(Request $request, string $uuid)
    {
        try {
            $subCategory = SubCategory::where('uuid', $uuid)->first();
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
    public function destroy(string $uuid)
    {
        $subCategory = SubCategory::find($uuid);
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