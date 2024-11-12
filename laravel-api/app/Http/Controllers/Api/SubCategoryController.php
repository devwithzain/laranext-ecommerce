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
                'errors' => $validator->customMessages()
            ], 422);
        }
        $product = SubCategory::create([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'category_name' => $request->category_name,
        ]);
        return response()->json([
            'success' => 'SubCategory created successfully',
            "data" => new SubCategoryResource($product)
        ], );
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
            'subcategory' => $subcategory
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