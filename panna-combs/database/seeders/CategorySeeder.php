<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => '9" Ladies Hair Comb',
                'description' => 'Premium quality hair combs designed specifically for women\'s hair.'
            ],
            [
                'name' => '9" Ladies Designer Combs',
                'description' => 'Elegantly designed fancy combs for women with decorative elements.'
            ],
            [
                'name' => '9" Ladies Stylish Combs',
                'description' => 'Trendy and stylish combs for the fashion-conscious woman.'
            ],
            [
                'name' => '9" Shampoo Combs',
                'description' => 'Combs specifically designed for use with shampoo and conditioning products.'
            ],
            [
                'name' => '9" Ladies Handle Combs',
                'description' => 'Comfortable handle combs for easy styling and grooming.'
            ],
            [
                'name' => '7" Gents Combs',
                'description' => 'Durable and strong combs designed for men\'s hair.'
            ],
            [
                'name' => '5" Premium Combs',
                'description' => 'High-end premium combs made with the finest materials.'
            ],
            [
                'name' => '5" Gents Pocket Combs',
                'description' => 'Compact pocket combs for men on the go.'
            ],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
            ]);
        }
    }
}
