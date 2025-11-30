<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
     protected $model = Product::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 5, 100), // Random price between 5 and 100
            'sale_price' => fake()->randomFloat(2, 1, 99), // Random sale price between 1 and 99
            'category_id' => Category::factory(), // Creates a new category for each product
            'image_url' => fake()->imageUrl(), // Generates a random image URL
            'stock_quantity' => fake()->numberBetween(0, 100), // Random stock quantity between 0 and 100
        ];
    }
}
