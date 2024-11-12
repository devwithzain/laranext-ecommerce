<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function rules(): array
    {
        if (request()->isMethod('post')) {
            return [
                'name' => 'required|string|max:258',
                'category' => 'required|string|max:258',
                'subCategory' => 'required|string|max:258',
                'shortDescription' => 'required|string|max:258',
                'longDescription' => 'required|string|max:258',
                'isFeatured' => 'required|boolean',
                'isArchived' => 'required|boolean',
                'topBrands' => 'required|boolean',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ];
        } else {
            return [
                'name' => 'required|string|max:258',
                'category' => 'required|string|max:258',
                'subCategory' => 'required|string|max:258',
                'shortDescription' => 'required|string|max:258',
                'longDescription' => 'required|string|max:258',
                'isFeatured' => 'required|boolean',
                'isArchived' => 'required|boolean',
                'topBrands' => 'required|boolean',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ];
        }
    }
    public function messages()
    {
        if (request()->isMethod('post')) {
            return [
                'name.required' => 'Name is required!',
            ];
        } else {
            return [
                'name.required' => 'Name is required!',
            ];
        }
    }
}