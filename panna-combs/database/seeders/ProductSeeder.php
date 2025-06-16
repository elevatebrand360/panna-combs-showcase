<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Classic Ladies Hair Comb',
                'product_code' => 'LC001',
                'description' => 'A classic 9-inch hair comb for everyday use, perfect for detangling and styling.',
                'category_id' => 1,
                'whatsapp_number' => '+1234567890',
                'contact_person' => 'John Doe',
                'email' => 'john@example.com'
            ],
            [
                'name' => 'Elegant Fancy Comb',
                'product_code' => 'FC002',
                'description' => 'A decorative 9-inch fancy comb with elegant detailing for special occasions.',
                'category_id' => 2,
                'whatsapp_number' => '+1234567891',
                'contact_person' => 'Jane Smith',
                'email' => 'jane@example.com'
            ],
            [
                'name' => 'Modern Stylish Comb',
                'product_code' => 'SC003',
                'description' => 'A trendy 9-inch stylish comb with contemporary design for the fashion-forward woman.',
                'category_id' => 3,
                'whatsapp_number' => '+1234567892',
                'contact_person' => 'Mike Johnson',
                'email' => 'mike@example.com'
            ],
            [
                'name' => 'Salon Shampoo Comb',
                'product_code' => 'SH004',
                'description' => 'A professional 9-inch shampoo comb designed for use in salons with wet hair.',
                'category_id' => 4,
                'whatsapp_number' => '+1234567893',
                'contact_person' => 'Sarah Wilson',
                'email' => 'sarah@example.com'
            ],
            [
                'name' => 'Comfort Handle Comb',
                'product_code' => 'HC005',
                'description' => 'A 9-inch ladies comb with an ergonomic handle for comfortable use.',
                'category_id' => 5,
                'whatsapp_number' => '+1234567894',
                'contact_person' => 'Tom Brown',
                'email' => 'tom@example.com'
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
