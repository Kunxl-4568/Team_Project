<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\Auth\GoogleAccountController;


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

    // Password Reset Routes
    Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');
    
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');
    
    Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');
    
    Route::post('/reset-password', [NewPasswordController::class, 'store'])
        ->name('password.update');
});

// Google OAuth routes
Route::get('/auth/google', [GoogleAccountController::class, 'redirect'])
    ->name('auth.google');

Route::get('/auth/google/callback', [GoogleAccountController::class, 'callback'])
    ->name('auth.google.callback');

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

Route::prefix('admin')->group(function (){
    Route::get('/users', function (){
        return inertia('admin/users');
    });
});

Route::prefix('admin')->group(function (){
    Route::get('/products', function (){
        return inertia('admin/products');
    });
});

Route::prefix('admin')->group(function (){
    Route::get('/dashboard', function (){
        return inertia('admin/dashboard');
    });
});

Route::prefix('admin')->group(function (){
    Route::get('/orders', function (){
        return inertia('admin/orders');
    });
});

Route::prefix('admin')->group(function (){
    Route::get('/account', function (){
        return inertia('admin/account');
    });
});

Route::get('admin/users/{id}', function ($id) {
    return Inertia::render('admin/ViewUserPage', [
        'id' => $id
    ]);
});

Route::get('admin/orders/{id}', function ($id) {
    return Inertia::render('admin/ViewOrderPage', [
        'id' => $id
    ]);
});


//Chatbot
Route::post('/api/chatbot', [ChatbotController::class, 'chat'])->name('chatbot.chat');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
