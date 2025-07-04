<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['category', 'images'])->paginate(10);
        return view('admin.products.index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return view('admin.products.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:200',
            'product_code' => 'required|string|min:3|max:20|unique:products',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'whatsapp_number' => 'required|string|regex:/^\+?[1-9]\d{1,14}$/',
            'contact_person' => 'required|string|min:3|max:100',
            'email' => 'required|email',
            'images' => 'required|array|min:1|max:4',
            'images.*' => 'image|mimes:jpg,jpeg,png|max:2048',
        ]);

        try {
            DB::beginTransaction();

            $product = Product::create([
                'name' => $validated['name'],
                'product_code' => $validated['product_code'],
                'category_id' => $validated['category_id'],
                'description' => $validated['description'],
                'whatsapp_number' => $validated['whatsapp_number'],
                'contact_person' => $validated['contact_person'],
                'email' => $validated['email'],
            ]);

            foreach ($request->file('images') as $image) {
                $path = Storage::disk('backblaze')->putFile('images', $image);
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => $path,
                ]);
            }

            DB::commit();
            return redirect()->route('admin.products.index')->with('success', 'Product created successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to create product: ' . $e->getMessage())->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load(['category', 'images']);
        return view('admin.products.show', compact('product'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();
        $product->load('images');
        return view('admin.products.edit', compact('product', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:200',
            'product_code' => 'required|string|min:3|max:20|unique:products,product_code,' . $product->id,
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'whatsapp_number' => 'required|string|regex:/^\+?[1-9]\d{1,14}$/',
            'email' => 'required|email',
            'images' => 'nullable|array|max:4',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:5120',
            'existing_images' => 'nullable|array',
        ]);

        try {
            DB::beginTransaction();

            // Update the product
            $product->update([
                'name' => $validated['name'],
                'product_code' => $validated['product_code'],
                'category_id' => $validated['category_id'],
                'description' => $validated['description'],
                'whatsapp_number' => $validated['whatsapp_number'],
                'email' => $validated['email'],
            ]);

            // Handle existing images
            $existingImages = $request->input('existing_images', []);
            $product->images()->whereNotIn('image_url', $existingImages)->delete();

            // Upload new images
            if ($request->hasFile('images')) {
                $currentImageCount = count($existingImages);
                
                foreach ($request->file('images') as $index => $image) {
                    if ($currentImageCount >= 4) break;

                    $path = Storage::disk('backblaze')->putFile('images', $image);

                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_url' => $path,
                        'display_order' => $currentImageCount + 1,
                    ]);

                    $currentImageCount++;
                }
            }

            DB::commit();
            return redirect()->route('admin.products.index')->with('success', 'Product updated successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to update product: ' . $e->getMessage())->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            DB::beginTransaction();

            // Delete the product (this will cascade delete images from DB)
            $product->delete();

            DB::commit();
            return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to delete product: ' . $e->getMessage());
        }
    }
}
