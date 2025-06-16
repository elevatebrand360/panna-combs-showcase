<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        return [
            'name' => $this->faker->words(3, true),
            'product_code' => $this->faker->unique()->bothify('PROD-####-????'),
            'category_id' => Category::factory(),
            'description' => $this->faker->paragraph(),
            'whatsapp_number' => $this->faker->numerify('+91##########'),
            'email' => $this->faker->unique()->safeEmail(),
        ];
    }
} 