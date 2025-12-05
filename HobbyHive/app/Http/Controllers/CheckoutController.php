<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Container\Attributes\Log;
 

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        $cart = app(\App\Http\Controllers\CartController::class)->getCart(); // or reuse your cart logic
        $cartItems = $cart->items()->get(); // ensure items have price & quantity loaded

        $subtotal = $cartItems->sum(function ($item) {
            return ($item->price ?? 0) * ($item->quantity ?? 0);
        });


        return Inertia::render('Checkout', [
            'subtotal' => (float) $subtotal,
           
        ]);
    }
}
