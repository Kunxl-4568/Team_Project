<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class HomeController extends Controller {
    public function index() {
        // Get wishlist product IDs for current user/session
        if (Auth::check()) {
            $wishlist = Wishlist::where('user_id', Auth::id())->first();
        } else {
            $wishlist = Wishlist::where('session_id', Session::getId())->first();
        }
        $wishlistIds = $wishlist ? $wishlist->items()->pluck('product_product_id')->toArray() : [];

        $products = Product::with('category')->limit(3)->get()->map(function($product) use ($wishlistIds) {
             $onSale = $product->sale_price !== null && $product->sale_price < $product->price;
             return [
               'id' => $product->product_id,
               'name' => $product->name,
               'price' => $onSale ? $product->sale_price : $product->price,
               'originalPrice' => $onSale ? $product->price : null,
               'image' => asset($product->image_url),
               'isOnSale' => $product->sale_price < $product->price,
               'isInWishlist' => in_array($product->product_id, $wishlistIds),
               'category' => [
                 'name' => $product->category->name ?? 'Unknown']
            ];
        });
        return Inertia::render('Home', [
            'products' => $products
        ]);
    }
}
