<?php

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Session;

uses(RefreshDatabase::class);

test('cart page loads successfully', function () {
    $response = $this->get(route('cart.index'));

    $response->assertStatus(200);
});

test('guest can add product to cart', function () {
    $product = Product::create([
        'product_id' => 1,
        'name' => 'Test Product',
        'price' => 19.99,
        'stock_quantity' => 10,
        'image_url' => 'test.jpg',
    ]);

    $response = $this->post(route('cart.store'), [
        'product_id' => $product->product_id,
        'quantity' => 2,
    ]);

    $response->assertStatus(200);

    $cart = Cart::first();

    expect($cart)->not->toBeNull();

    $this->assertDatabaseHas('cart_items', [
        'cart_id' => $cart->id,
        'product_id' => $product->product_id,
        'quantity' => 2,
    ]);
});

test('adding same product updates quantity', function () {
    $product = Product::create([
        'product_id' => 1,
        'name' => 'Test Product',
        'price' => 19.99,
        'stock_quantity' => 10,
        'image_url' => 'test.jpg',
    ]);

    $cart = Cart::create([
        'session_id' => Session::getId(),
        'user_id' => null,
    ]);

    CartItem::create([
        'cart_id' => $cart->id,
        'product_id' => $product->product_id,
        'quantity' => 2,
        'price' => 19.99,
    ]);

    $response = $this->post(route('cart.store'), [
        'product_id' => $product->product_id,
        'quantity' => 3,
    ]);

    $response->assertStatus(200);

    $this->assertDatabaseHas('cart_items', [
        'cart_id' => $cart->id,
        'product_id' => $product->product_id,
        'quantity' => 5,
    ]);
});

test('cannot add product if stock is too low', function () {
    $product = Product::create([
        'product_id' => 1,
        'name' => 'Low Stock Product',
        'price' => 9.99,
        'stock_quantity' => 1,
        'image_url' => 'test.jpg',
    ]);

    $response = $this->post(route('cart.store'), [
        'product_id' => $product->product_id,
        'quantity' => 5,
    ]);

    $response->assertStatus(422);

    $response->assertJson([
        'success' => false,
        'message' => 'Not enough stock available',
    ]);
});

test('can update cart item quantity', function () {
    $product = Product::create([
        'product_id' => 1,
        'name' => 'Test Product',
        'price' => 10.00,
        'stock_quantity' => 10,
        'image_url' => 'test.jpg',
    ]);

    $cart = Cart::create([
        'session_id' => Session::getId(),
        'user_id' => null,
    ]);

    $cartItem = CartItem::create([
        'cart_id' => $cart->id,
        'product_id' => $product->product_id,
        'quantity' => 1,
        'price' => 10.00,
    ]);

    $response = $this->put(route('cart.update', $cartItem->id), [
        'quantity' => 4,
    ]);

    $response->assertStatus(200);

    $this->assertDatabaseHas('cart_items', [
        'id' => $cartItem->id,
        'quantity' => 4,
    ]);
});

test('can remove cart item', function () {
    $product = Product::create([
        'product_id' => 1,
        'name' => 'Test Product',
        'price' => 10.00,
        'stock_quantity' => 10,
        'image_url' => 'test.jpg',
    ]);

    $cart = Cart::create([
        'session_id' => Session::getId(),
        'user_id' => null,
    ]);

    $cartItem = CartItem::create([
        'cart_id' => $cart->id,
        'product_id' => $product->product_id,
        'quantity' => 1,
        'price' => 10.00,
    ]);

    $response = $this->delete(route('cart.destroy', $cartItem->id));

    $response->assertStatus(200);

    $this->assertDatabaseMissing('cart_items', [
        'id' => $cartItem->id,
    ]);
});

test('can clear the cart', function () {
    $product = Product::create([
        'product_id' => 1,
        'name' => 'Test Product',
        'price' => 10.00,
        'stock_quantity' => 10,
        'image_url' => 'test.jpg',
    ]);

    $cart = Cart::create([
        'session_id' => Session::getId(),
        'user_id' => null,
    ]);

    CartItem::create([
        'cart_id' => $cart->id,
        'product_id' => $product->product_id,
        'quantity' => 1,
        'price' => 10.00,
    ]);

    CartItem::create([
        'cart_id' => $cart->id,
        'product_id' => $product->product_id,
        'quantity' => 2,
        'price' => 10.00,
    ]);

    $response = $this->delete(route('cart.clear'));

    $response->assertStatus(200);

    expect($cart->items()->count())->toBe(0);
});