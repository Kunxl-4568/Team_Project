<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// 👉 Add this route
Route::get('/transaction-demo', function () {
    return Inertia::render('TransactionDemo');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
