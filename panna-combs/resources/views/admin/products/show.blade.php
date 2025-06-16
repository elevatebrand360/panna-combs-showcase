<x-admin-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ $product->name }}
            </h2>
            <div class="flex space-x-2">
                <a href="{{ route('admin.products.edit', $product) }}" class="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                    Edit Product
                </a>
                <form action="{{ route('admin.products.destroy', $product) }}" method="POST" class="inline" onsubmit="return confirm('Are you sure you want to delete this product?');">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150">
                        Delete Product
                    </button>
                </form>
            </div>
        </div>
    </x-slot>

    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div class="p-6 bg-white border-b border-gray-200">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Product Images -->
                <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Product Images</h3>
                    <div class="grid grid-cols-2 gap-4">
                        @forelse($product->images as $image)
                            <div class="relative aspect-square">
                                <img src="{{ $image->image_url }}" alt="{{ $product->name }}" class="w-full h-full object-cover rounded-lg">
                                <div class="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                                    Image {{ $image->display_order }}
                                </div>
                            </div>
                        @empty
                            <div class="col-span-2 text-center py-8 text-gray-500">
                                No images available
                            </div>
                        @endforelse
                    </div>
                </div>

                <!-- Product Details -->
                <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
                    <dl class="grid grid-cols-1 gap-4">
                        <div>
                            <dt class="text-sm font-medium text-gray-500">Product Code</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{ $product->product_code }}</dd>
                        </div>

                        <div>
                            <dt class="text-sm font-medium text-gray-500">Category</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{ $product->category->name }}</dd>
                        </div>

                        <div>
                            <dt class="text-sm font-medium text-gray-500">Description</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{ $product->description ?: 'No description available' }}</dd>
                        </div>

                        <div>
                            <dt class="text-sm font-medium text-gray-500">Contact Information</dt>
                            <dd class="mt-1 text-sm text-gray-900">
                                <div class="flex items-center space-x-2">
                                    <span>📱</span>
                                    <span>{{ $product->whatsapp_number }}</span>
                                </div>
                                <div class="flex items-center space-x-2 mt-1">
                                    <span>✉️</span>
                                    <span>{{ $product->email }}</span>
                                </div>
                            </dd>
                        </div>

                        <div>
                            <dt class="text-sm font-medium text-gray-500">Created At</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{ $product->created_at->format('F j, Y g:i A') }}</dd>
                        </div>

                        <div>
                            <dt class="text-sm font-medium text-gray-500">Last Updated</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{ $product->updated_at->format('F j, Y g:i A') }}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</x-admin-layout> 