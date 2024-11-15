<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:258',
            'category' => 'required|string|max:258',
            'subCategory' => 'required|string|max:258',
            'shortDescription' => 'required|string|max:258',
            'longDescription' => 'required|string|max:258',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'The name field is required!',
            'category.required' => 'Category field is required!',
            'subCategory.required' => 'Sub Categorys field is required!',
            'shortDescription.required' => 'Short Descriptions field is required!',
            'longDescription.required' => 'Long Descriptions field is required!',
            'image.required' => 'Image field is required!',
        ];
    }
}