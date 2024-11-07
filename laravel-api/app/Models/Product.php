<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $primaryKey = 'uuid';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'products';

    protected $fillable = ['name', 'category', 'subCategory', 'shortDescription', 'longDescription', 'isFeatured', 'topBrands', 'image', 'isArchived'];
}