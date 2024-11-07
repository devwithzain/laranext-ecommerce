<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'category' => $this->category,
            'subCategory' => $this->subCategory,
            'shortDescription' => $this->shortDescription,
            'longDescription' => $this->longDescription,
            'isFeatured' => $this->isFeatured,
            'isArchived' => $this->isArchived,
            'topBrands' => $this->topBrands,
            'image' => $this->image,
        ];
    }
}