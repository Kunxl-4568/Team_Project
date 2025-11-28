<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Category::factory(5)->create();

        Category::truncate(); // Clears the table before seeding, avoids duplicates

        $categories = [
            ['name' => 'Seasonal'],
            ['name' => 'Art Supplies'],
            ['name' => 'Toys & Games'],
            ['name' => 'Textile Crafts'],
            ['name' => 'Books'],
        // Add more categories as needed - DIY Kits, project mode
        ];

        foreach ($categories as $category) {
            Category::create($category); // This will set created_at and updated_at
        }
    }
}
