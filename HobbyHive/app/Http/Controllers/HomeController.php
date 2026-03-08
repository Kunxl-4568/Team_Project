<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class HomeController extends Controller {
    public function index() {
        $products = Product::with('category')->limit(3)->get()->map(function($product){
             $onSale = $product->sale_price !== null && $product->sale_price < $product->price;
             return [
               'id' => $product->product_id,
               'name' => $product->name,
               'price' => $onSale ? $product->sale_price : $product->price,
               'originalPrice' => $onSale ? $product->price : null,
                'image' => asset($product->image_url),
               'isOnSale' => $product->sale_price < $product->price,
               'isInWishlist' => false, 
               'category' => [
                 'name' => $product->category->name ?? 'Unknown']
            ];
        });
        return Inertia::render('Home', [
            'products' => $products
        ]);
    }
}