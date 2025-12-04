<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/preview-reset-password', function () {
    return Inertia::render('auth/reset-password', [
        'token' => 'test-token',
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/contact-us', function () {
    return Inertia::render('contact-us');
});

Route::get('/about-us', function () {
    return Inertia::render('AboutUs');
});

/*
Route::get('/cart', function(){
    return Inertia::render('CartPage', [
        'cartItems' => [],
        'subtotal' => 0,
    ]);
});
*/


Route::get('/cart', function (){
    return Inertia::render('CartPage', [
        'cartItems' => [
            ['id' => 1, 'title' => 'Faber Castell Pencils', 'image' => '/images/Faber Castell metal tin.png', 'price' => 69.95, 'quantity' => 1],
            ['id' => 2, 'title' => 'Faber Coloured Pencils', 'image' => '/images/Faber Castell metal tin.png', 'price' => 12.00, 'quantity' => 2],
        ],
        'subtotal' => 93.95,
    ]);
});


Route::get('/Checkout', function (){
    return Inertia::render('Checkout');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::get('/transaction-demo', function () {
    return Inertia::render('TransactionDemo');
});
Route::get('/index', [ProductController::class, 'index'])->name('products.index');

Route::get('/products', [ProductController::class, 'index'])->name('products.index');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
