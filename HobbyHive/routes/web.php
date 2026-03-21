<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\WishlistController;

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
 Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
})->name('dashboard');

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'admin'])  // must be logged in AND admin
    ->group(function () {
        Route::get('/dashboard', fn () => Inertia::render('admin/dashboard'))
            ->name('dashboard');

        Route::get('/inventory', [InventoryController::class, 'index'])
            ->name('inventory');
    });

Route::get('/contact-us', function () {
    return Inertia::render('contact-us');
});

Route::get('/about-us', function () {
    return Inertia::render('AboutUs');
});

Route::get('/OrderConfirmation', function () {
    return Inertia::render('order-confirmation');
});

use App\Models\Wishlist;

Route::get('/dashboard', function () {
    $wishlist = auth()->check()
        ? Wishlist::where('user_id', auth()->id())->with(['items.product'])->first()
        : Wishlist::where('session_id', session()->getId())->with(['items.product'])->first();

    $wishlistItems = $wishlist
        ? $wishlist->items->map(function ($item) {
            $product = $item->product;
            return [
                'id' => $item->id,
                'product_id' => $product->product_id,
                'title' => $product->name,
                'image' => $product->image_url,
                'price' => (float) $product->price,
            ];
        })
        : [];

        $orderItems = [
            [
            'id' => 1,
            'product_id' => 10,
            'title' => 'Monopoly',
            'image' => '/images/Monopoly.png',
            'status' => 'Processing',
            'trackingStep' => 1,
        ],
        [
            'id' => 2,
            'product_id' => 11,
            'title' => 'Monopoly Deluxe',
            'image' => '/images/Paint-set.png',
            'status' => 'Shipped',
            'trackingStep' => 2,
        ],
        [
            'id' => 3,
            'product_id' => 12,
            'title' => 'Monopoly Classic',
            'image' => '/images/Monopoly.png',
            'status' => 'Delivered',
            'trackingStep' => 3,
        ],
    ];


    return Inertia::render('UserDashboard/dashboard', [
        'wishlistItems' => $wishlistItems,
        'orderItems' => $orderItems,
    ]);
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


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

//Home page
Route::get('/', [HomeController::class, 'index'])->name('home');

// Individual Product page & product context 
Route::get('/products/{id}', [ProductController::class, 'show']) ->name('products.show');

Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist.index');
Route::post('/wishlist/toggle', [WishlistController::class, 'toggle'])->name('wishlist.toggle');
Route::post('/wishlist/clear', [WishlistController::class, 'clear'])->name('wishlist.clear');
Route::delete('/wishlist/{id}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');
Route::get('/wishlist/ids', [WishlistController::class, 'getWishlistIds'])->name('wishlist.ids');

Route::get('/orders', function () {
    return Inertia::render('UserDashboard/PreviousOrders', [
        'orders' => [
            [
                'id' => 1,
                'date' => "2026-03-20",
                'status' => 'Delivered',
                'total' => 59.99,
                'items' => [
                    [
                        'id' => 9,
                        'product_id' => 1,
                        'title' => 'Monopoly',
                        'image' => '/images/Monopoly.png',
                        'price' => 19.99,
                        'quantity' => 1,
                        'return_status' => 'None'
                    ],
                    [
                        'id' => 11,
                        'product_id' => 2,
                        'title' => 'Jenga',
                        'image' => '/images/Jenga.png',
                        'price' => 19.99,
                        'quantity' => 1,
                        'return_status' => 'None'
                    ]
                ]
            ],
            [
                'id' => 2,
                'date' => "2026-03-20",
                'status' => 'In Transit',
                'total' => 59.99,
                'items' => [
                    [
                        'id' => 10,
                        'product_id' => 1,
                        'title' => 'Beads',
                        'image' => '/images/Beads.png',
                        'price' => 19.99,
                        'quantity' => 1,
                        'return_status' => 'None'
                    ],
                    [
                        'id' => 7,
                        'product_id' => 3,
                        'title' => 'Pencil case',
                        'image' => '/images/Pencil-case.png',
                        'price' => 3.99,
                        'quantity' => 1,
                        'return_status' => 'None'
                    ],
                    [
                        'id' => 10,
                        'product_id' => 1,
                        'title' => 'Monopoly',
                        'image' => '/images/Monopoly.png',
                        'price' => 19.99,
                        'quantity' => 1,
                        'return_status' => 'None'
                    ],
                    [
                        'id' => 10,
                        'product_id' => 1,
                        'title' => 'Monopoly',
                        'image' => '/images/Monopoly.png',
                        'price' => 19.99,
                        'quantity' => 1,
                        'return_status' => 'None'
                    ],
                    [
                        'id' => 11,
                        'product_id' => 2,
                        'title' => 'Jenga',
                        'image' => '/images/Jenga.png',
                        'price' => 19.99,
                        'quantity' => 1,
                        'return_status' => 'None'
                    ],
                    [
                        'id' => 11,
                        'product_id' => 2,
                        'title' => 'Jenga',
                        'image' => '/images/Jenga.png',
                        'price' => 19.99,
                        'quantity' => 1,
                        'return_status' => 'None'
                    ],
                    
            ]
        ]
        ]
    ]);
});
