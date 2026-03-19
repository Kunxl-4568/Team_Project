<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'total_price' => 'nullable|numeric|min:0',
        ]);

        $order = Order::create([
            'customer_name' => $validated['customer_name'] ?? null,
            'email' => $validated['email'],
            'total_price' => $validated['total_price'] ?? 0,
            'status' => 'confirmed',
        ]);

        return redirect()->route('order.confirmation', $order->id);
    }

    public function confirmation(Order $order)
    {
        return Inertia::render('OrderConfirmation', [
            'order' => [
                'id' => $order->id,
                'customer_name' => $order->customer_name,
                'email' => $order->email,
                'total_price' => $order->total_price,
                'status' => $order->status,
            ]
        ]);
    }
}