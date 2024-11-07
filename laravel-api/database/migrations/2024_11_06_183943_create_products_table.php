<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('uuid')->primary()->default(DB::raw('(UUID())'));
            $table->string('name');
            $table->string('category');
            $table->string('subCategory');
            $table->string('image');
            $table->mediumText('shortDescription');
            $table->longText('longDescription');
            $table->boolean('isFeatured');
            $table->boolean('topBrands');
            $table->boolean('isArchived');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};