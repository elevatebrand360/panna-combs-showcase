<?php

namespace Database\Seeders;

use App\Models\ProductImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $images = [
            [
                'product_id' => 1,
                'image_url' => 'https://images.unsplash.com/photo-1599771334443-3048259bc702?q=80&w=1974&auto=format&fit=crop',
                'display_order' => 1
            ],
            [
                'product_id' => 1,
                'image_url' => 'https://images.unsplash.com/photo-1622429499146-bc47772d8a52?q=80&w=1788&auto=format&fit=crop',
                'display_order' => 2
            ],
            [
                'product_id' => 2,
                'image_url' => 'https://images.unsplash.com/photo-1590159763121-7c9fd312190d?q=80&w=2072&auto=format&fit=crop',
                'display_order' => 1
            ],
            [
                'product_id' => 2,
                'image_url' => 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop',
                'display_order' => 2
            ],
            [
                'product_id' => 3,
                'image_url' => 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop',
                'display_order' => 1
            ],
            [
                'product_id' => 4,
                'image_url' => 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?q=80&w=2069&auto=format&fit=crop',
                'display_order' => 1
            ],
            [
                'product_id' => 5,
                'image_url' => 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?q=80&w=2070&auto=format&fit=crop',
                'display_order' => 1
            ],
        ];

        foreach ($images as $image) {
            ProductImage::create($image);
        }
    }
}
