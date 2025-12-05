<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Get or create cart for current user/session
    public function getCart()
    {
        if (Auth::check()) {
            // For logged-in users
            $user = Auth::user();
            return Cart::firstOrCreate(['user_id' => $user->id]);
        } else {
            // For guest users, use session
            $sessionId = Session::getId();
            return Cart::firstOrCreate(['session_id' => $sessionId], ['user_id' => null]);
        }
    }

    // Change items for Inertia / JSON
    private function transformItems($cartItems)
    {
        return $cartItems->map(function ($item) {
            $product = $item->product;
            return [
                'id' => $item->id,
                'product_id' => $product->id,
                'title' => $product->name,
                'image' => $product->image_url, 
                'price' => (float) $item->price,
                'quantity' => (int) $item->quantity,
                'stock' => (int) $product->stock_quantity,
                'line_total' => (float) ($item->price * $item->quantity),
            ];
        })->values();
    }

    // helper: respond in a way Inertia expects
    private function respondAfter(Request $request, string $message, $status = 200)
    {
        // Inertia will follow redirects and re-render with fresh props
        if ($request->header('X-Inertia')) {
            return redirect()->route('cart.index')->with('success', $message);
        }

        // For plain AJAX/Fetch clients return JSON
        return response()->json(['success' => true, 'message' => $message], $status);
    }

    // Display cart page
    public function index(Request $request)
    {
        $cart = $this->getCart();
        $cartItems = $cart->items()->with('product')->get();
        $items = $this->transformItems($cartItems);
        $total = $items->sum('line_total');

        return Inertia::render('CartPage', [
            'cartItems' => $items,
            'subtotal' => $total,
            'itemCount' => $items->sum('quantity'),
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    // Add item to cart
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,product_id',
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::findOrFail($request->product_id);
        
        // Check stock
        if ($product->stock_quantity < $request->quantity) { //stock_quantity
            if ($request->header('X-Inertia')) {
                return back()->with('error', 'Not enough stock available');
            }
            return response()->json(['success' => false, 'message' => 'Not enough stock available'], 422);
        }

        $cart = $this->getCart();

        // Check if item already exists in cart
        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_product_id', $request->product_id)
            ->first();
        if ($cartItem) {
            // Update quantity
            $newQuantity = $cartItem->quantity + $request->quantity;
            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            // Create new cart item
            CartItem::create([
                'cart_id' => $cart->id,
                'product_product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'price' => $product->price 
            ]);
        }

        return $this->respondAfter($request, 'Product added to cart!');
    }

    // Update cart item quantity
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $cartItem = CartItem::findOrFail($id);
        
        // Check stock
        if ($cartItem->product->stock_quantity < $request->quantity) {
            if ($request->header('X-Inertia')) {
                return back()->with('error', 'Not enough stock available');
            }
            return response()->json(['success' => false, 'message' => 'Not enough stock available'], 422);
        }

        $cartItem->update(['quantity' => $request->quantity]);

        return $this->respondAfter($request, 'Cart updated successfully!');
    }

    // Remove item from cart
    public function destroy(Request $request, $id)
    {
        $cartItem = CartItem::findOrFail($id);
        $cartItem->delete();

        return $this->respondAfter($request, 'Item removed from cart!');
    }

    // Clear entire cart
    public function clear(Request $request)
    {
        $cart = $this->getCart();
        $cart->items()->delete();

        return $this->respondAfter($request, 'Cart cleared!');
    }
}


