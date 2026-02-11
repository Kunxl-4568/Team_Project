<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\InventoryController;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/preview-reset-password', function () {
    return Inertia::render('auth/reset-password', [
        'token' => 'test-token',
    ]);
});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('/dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// Route::get('/dashboard', function () {
//         return Inertia::render('dashboard');
// })->name('dashboard');

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'admin'])  // must be logged in AND admin
    ->group(function () {
        Route::get('/dashboard', fn () => Inertia::render('admin/dashboard'))
            ->name('dashboard');

        Route::get('/inventory', [InventoryController::class, 'index'])
            ->name('inventory.index');
    });

Route::get('/contact-us', function () {
    return Inertia::render('contact-us');
});

Route::get('/about-us', function () {
    return Inertia::render('AboutUs');
});

//login and register routes
Route::middleware('guest')->group(function () {
    // Login routes
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');
    
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);

    // Register routes
    Route::get('/register', [RegisteredUserController::class, 'create'])
        ->name('register');
    
    Route::post('/register', [RegisteredUserController::class, 'store']);
});

//destroy doesn't exist. uncomment when implemented

Route::middleware('auth')->group(function () {
    // Logout route
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::get('/transaction-demo', function () {
    return Inertia::render('TransactionDemo');
});
Route::get('/index', [ProductController::class, 'index'])->name('products.index');

Route::get('/products', [ProductController::class, 'index'])->name('products.index');

// Cart
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::put('/cart/{id}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
Route::post('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');

//checkout
Route::get('/Checkout', [CheckoutController::class, 'index'])->name('checkout');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
