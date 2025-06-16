<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;

class ProductImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $images = ProductImage::with('product')->latest()->paginate(10);
        return view('admin.product-images.index', compact('images'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::all();
        return view('admin.product-images.create', compact('products'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'image_url' => 'required|url|regex:/\.(jpg|jpeg|png)$/i',
            'display_order' => 'required|integer|between:1,4',
        ]);

        // Check if product already has 4 images
        $imageCount = ProductImage::where('product_id', $validated['product_id'])->count();
        if ($imageCount >= 4) {
            return back()->with('error', 'Product already has maximum number of images (4).');
        }

        ProductImage::create($validated);

        return redirect()->route('admin.product-images.index')
            ->with('success', 'Product image added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductImage $productImage)
    {
        $productImage->load('product');
        return view('admin.product-images.show', compact('productImage'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductImage $productImage)
    {
        $products = Product::all();
        return view('admin.product-images.edit', compact('productImage', 'products'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductImage $productImage)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'image_url' => 'required|url|regex:/\.(jpg|jpeg|png)$/i',
            'display_order' => 'required|integer|between:1,4',
        ]);

        $productImage->update($validated);

        return redirect()->route('admin.product-images.index')
            ->with('success', 'Product image updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductImage $productImage)
    {
        $productImage->delete();

        return redirect()->route('admin.product-images.index')
            ->with('success', 'Product image deleted successfully.');
    }
}
