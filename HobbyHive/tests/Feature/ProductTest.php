<?php

use App\Models\Product;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(Tests\TestCase::class, RefreshDatabase::class);

test('products page loads successfully', function () {
    $response = $this->get('/products');

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) =>
        $page->component('Products/Index')
    );
});

test('all products are returned when no filters are applied', function () {
    $category = Category::create([
        'name' => 'Offers',
    ]);

    Product::create([
        'name' => 'Guinea Pig Bed',
        'description' => 'Soft bed',
        'price' => 20.00,
        'sale_price' => 15.00,
        'category_id' => $category->id,
        'image_url' => 'bed.jpg',
        'stock_quantity' => 10,
    ]);

    Product::create([
        'name' => 'Hay Feeder',
        'description' => 'Wooden feeder',
        'price' => 12.00,
        'sale_price' => 12.00,
        'category_id' => $category->id,
        'image_url' => 'feeder.jpg',
        'stock_quantity' => 5,
    ]);

    $response = $this->get('/products');

    $response->assertStatus(200);

    $response->assertInertia(fn (Assert $page) =>
        $page->component('Products/Index')
             ->has('products', 2)
             ->where('selectedCategory', 'all')
             ->where('searchQuery', null)
    );
});

test('products can be filtered by category', function () {
    $offers = Category::create(['name' => 'Offers']);
    $bedding = Category::create(['name' => 'Bedding']);

    Product::create([
        'name' => 'Discount Tunnel',
        'description' => 'Tunnel',
        'price' => 25.00,
        'sale_price' => 15.00,
        'category_id' => $offers->id,
        'image_url' => 'tunnel.jpg',
        'stock_quantity' => 8,
    ]);

    Product::create([
        'name' => 'Paper Bedding',
        'description' => 'Bedding',
        'price' => 10.00,
        'sale_price' => 10.00,
        'category_id' => $bedding->id,
        'image_url' => 'bedding.jpg',
        'stock_quantity' => 6,
    ]);

    $response = $this->get('/products?category=offers');

    $response->assertStatus(200);

    $response->assertInertia(fn (Assert $page) =>
        $page->component('Products/Index')
             ->has('products', 1)
             ->where('products.0.name', 'Discount Tunnel')
             ->where('products.0.category.name', 'Offers')
             ->where('selectedCategory', 'offers')
    );
});

test('products can be searched by name', function () {
    $category = Category::create(['name' => 'Offers']);

    Product::create([
        'name' => 'Guinea Pig Bed',
        'description' => 'Soft bed',
        'price' => 20.00,
        'sale_price' => 20.00,
        'category_id' => $category->id,
        'image_url' => 'bed.jpg',
        'stock_quantity' => 10,
    ]);

    Product::create([
        'name' => 'Rabbit Tunnel',
        'description' => 'Tunnel',
        'price' => 18.00,
        'sale_price' => 18.00,
        'category_id' => $category->id,
        'image_url' => 'tunnel.jpg',
        'stock_quantity' => 7,
    ]);

    $response = $this->get('/products?search=Guinea');

    $response->assertStatus(200);

    $response->assertInertia(fn (Assert $page) =>
        $page->component('Products/Index')
             ->has('products', 1)
             ->where('products.0.name', 'Guinea Pig Bed')
             ->where('searchQuery', 'Guinea')
    );
});

test('sale price is used when item is on sale', function () {
    $category = Category::create(['name' => 'Offers']);

    Product::create([
        'name' => 'Discount House',
        'description' => 'House',
        'price' => 30.00,
        'sale_price' => 20.00,
        'category_id' => $category->id,
        'image_url' => 'house.jpg',
        'stock_quantity' => 3,
    ]);

    $response = $this->get('/products');

    $response->assertStatus(200);

    $response->assertInertia(fn (Assert $page) =>
        $page->where('products.0.price', 20)
             ->where('products.0.originalPrice', 30)
             ->where('products.0.isOnSale', true)
    );
});

test('original price is null when item is not on sale', function () {
    $category = Category::create(['name' => 'Offers']);

    Product::create([
        'name' => 'Normal Item',
        'description' => 'Item',
        'price' => 12.00,
        'sale_price' => 12.00,
        'category_id' => $category->id,
        'image_url' => 'item.jpg',
        'stock_quantity' => 4,
    ]);

    $response = $this->get('/products');

    $response->assertStatus(200);

    $response->assertInertia(fn (Assert $page) =>
        $page->where('products.0.price', 12)
             ->where('products.0.originalPrice', null)
             ->where('products.0.isOnSale', false)
    );
});