<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductImageController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('showcase');
});

// Admin Routes
Route::prefix('admin')->name('admin.')->group(function () {
    // Categories
    Route::resource('categories', CategoryController::class);
    
    // Products
    Route::resource('products', ProductController::class);
    
    // Product Images
    Route::resource('product-images', ProductImageController::class);
});
