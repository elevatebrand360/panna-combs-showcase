<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'images'])->paginate(10);
        return view('admin.products.index', compact('products'));
    }

    public function create()
    {
        $categories = \App\Models\Category::all();
        return view('admin.products.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'product_code' => 'required|string|max:50|unique:products',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'whatsapp_number' => 'required|string|regex:/^\+91[0-9]{10}$/',
            'email' => 'required|email',
            'images' => 'required|array|min:1|max:4',
            'images.*' => 'required|image|mimes:jpeg,png,jpg|max:5120',
        ]);

        $product = Product::create($validated);

        foreach ($request->file('images') as $index => $image) {
            $imageUrl = $product->uploadImage($image);
            ProductImage::create([
                'product_id' => $product->id,
                'image_url' => $imageUrl,
                'display_order' => $index + 1,
            ]);
        }

        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product->load('images'),
        ], 201);
    }

    public function show(Product $product)
    {
        return view('admin.products.show', compact('product'));
    }

    public function edit(Product $product)
    {
        $categories = \App\Models\Category::all();
        return view('admin.products.edit', compact('product', 'categories'));
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'product_code' => 'required|string|max:50|unique:products,product_code,' . $product->id,
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'whatsapp_number' => 'required|string|regex:/^\+91[0-9]{10}$/',
            'email' => 'required|email',
            'images' => 'nullable|array|max:4',
            'images.*' => 'required|image|mimes:jpeg,png,jpg|max:5120',
        ]);

        $product->update($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $imageUrl = $product->uploadImage($image);
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => $imageUrl,
                    'display_order' => $product->images()->count() + $index + 1,
                ]);
            }
        }

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product->load('images'),
        ]);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
} 