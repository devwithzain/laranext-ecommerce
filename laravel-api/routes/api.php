<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\SubCategoryController;
use App\Http\Controllers\Api\ImageUploadController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/images', [ImageUploadController::class, 'uploadImages']);


Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{uuid}', [ProductController::class, 'show']);
Route::patch('/products/{uuid}', [ProductController::class, 'update']);
Route::delete('/products/{uuid}', [ProductController::class, 'destroy']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{uuid}', [CategoryController::class, 'show']);
Route::patch('/categories/{uuid}', [CategoryController::class, 'update']);
Route::delete('/categories/{uuid}', [CategoryController::class, 'destroy']);

Route::get('/subcategories', [SubCategoryController::class, 'index']);
Route::post('/subcategories', [SubCategoryController::class, 'store']);
Route::get('/subcategories/{uuid}', [SubCategoryController::class, 'show']);
Route::patch('/subcategories/{uuid}', [SubCategoryController::class, 'update']);
Route::delete('/subcategories/{uuid}', [SubCategoryController::class, 'destroy']);