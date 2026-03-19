<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;
use App\Models\WishlistItem;
use App\Models\Product;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    // Get or create wishlist for current user/session
    public function getWishlist()
    {
        if (Auth::check()) {
            $user = Auth::user();
            return Wishlist::firstOrCreate(['user_id' => $user->id]);
        } else {
            $sessionId = Session::getId();
            return Wishlist::firstOrCreate(['session_id' => $sessionId], ['user_id' => null]);
        }
    }

    // Transform items for frontend
    private function transformItems($wishlistItems)
    {
        return $wishlistItems->map(function ($item) {
            $product = $item->product;
            return [
                'id' => $item->id,
                'product_id' => $product->product_id,
                'title' => $product->name,
                'image' => $product->image_url,
                'price' => (float) $product->price,
                'original_price' => $product->original_price ? (float) $product->original_price : null,
                'is_on_sale' => $product->original_price && $product->original_price > $product->price,
            ];
        })->values();
    }

    // Helper: respond correctly for Inertia
    private function respondAfter(Request $request, string $message, $status = 200)
    {
        if ($request->header('X-Inertia')) {
            return redirect()->back()->with('success', $message);
        }
        return response()->json(['success' => true, 'message' => $message], $status);
    }

    // Display wishlist page
    public function index(Request $request)
    {
        $wishlist = $this->getWishlist();
        $wishlistItems = $wishlist->items()->with('product')->get();
        $items = $this->transformItems($wishlistItems);
        $productIds = $items->pluck('product_id')->toArray();

        return Inertia::render('WishlistPage', [
            'wishlistItems' => $items,
            'wishlistProductIds' => $productIds,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    // Toggle item in wishlist (add if not present, remove if already there)
    public function toggle(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,product_id',
        ]);

        $wishlist = $this->getWishlist();

        $existing = WishlistItem::where('wishlist_id', $wishlist->id)
            ->where('product_product_id', $request->product_id)
            ->first();

        if ($existing) {
            $existing->delete();
            $message = 'Removed from wishlist';
            $inWishlist = false;
        } else {
            WishlistItem::create([
                'wishlist_id' => $wishlist->id,
                'product_product_id' => $request->product_id,
            ]);
            $message = 'Added to wishlist!';
            $inWishlist = true;
        }

        if ($request->header('X-Inertia')) {
            return redirect()->back()->with('success', $message);
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'in_wishlist' => $inWishlist,
        ]);
    }

    // Remove a specific item
    public function destroy(Request $request, $id)
    {
        $item = WishlistItem::findOrFail($id);
        $item->delete();

        return $this->respondAfter($request, 'Item removed from wishlist');
    }

    // Clear entire wishlist
    public function clear(Request $request)
    {
        $wishlist = $this->getWishlist();
        $wishlist->items()->delete();

        return $this->respondAfter($request, 'Wishlist cleared');
    }

    // Return current wishlist product IDs (used by frontend to show heart state)
    public function getWishlistIds(Request $request)
    {
        $wishlist = $this->getWishlist();
        $ids = $wishlist->items()->pluck('product_product_id')->toArray();

        return response()->json(['product_ids' => $ids]);
    }
}
