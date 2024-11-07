<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->uuid('uuid')->primary()->default(DB::raw('(UUID())'));
            $table->string('name');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};