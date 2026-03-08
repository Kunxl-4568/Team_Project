<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    private function getCart(): Cart
    {
        if (Auth::check()) {
            return Cart::firstOrCreate(['user_id' => Auth::id()]);
        }

        $sessionId = Session::getId();
        return Cart::firstOrCreate(['session_id' => $sessionId], ['user_id' => null]);
    }

    public function index(Request $request)
    {
        // keep your logic, just using local getCart
        $cart = $this->getCart();
        $cartItems = $cart->items()->get();

        $subtotal = $cartItems->sum(function ($item) {
            return ($item->price ?? 0) * ($item->quantity ?? 0);
        });

        return Inertia::render('Checkout', [
            'subtotal' => (float) $subtotal,
            'itemCount' => (int) $cartItems->sum('quantity'),
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required','string','max:120'],
            'email' => ['required','email','max:120'],
            'phone' => ['nullable','string','max:40'],

            'address_line1' => ['required','string','max:160'],
            'address_line2' => ['nullable','string','max:160'],
            'city' => ['required','string','max:120'],
            'postcode' => ['required','string','max:20'],
            'country' => ['required','string','max:80'],

            'payment_method' => ['required','string','max:40'],
        ]);

        $cart = $this->getCart();

        if ($cart->items()->count() === 0) {
            return back()->with('error', 'Your cart is empty.');
        }

        // Save details onto carts table (requires columns + fillable)
        $cart->fill($validated);
        $cart->status = 'ordered';
        $cart->checked_out_at = now();
        $cart->save();

        // Clear basket after checkout
        $cart->items()->delete();

        return redirect()->route('order.confirmation');
    }
}
