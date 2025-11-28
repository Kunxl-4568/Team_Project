<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all(); //fetch all categories
        
         // Create 20 products, each assigned to a random category
        Product::factory(20)->create([
            'category_id' => function () use ($categories) {
                return $categories->random()->id;
            },
        ]);
    }
}
