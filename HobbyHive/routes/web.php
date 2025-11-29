<?php

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

Route::middleware(['auth', 'verified']) ->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/contact-us', function (){
    return Inertia::render('contact-us');
});

Route::get('/about-us', function (){
    return Inertia::render('AboutUs');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';




