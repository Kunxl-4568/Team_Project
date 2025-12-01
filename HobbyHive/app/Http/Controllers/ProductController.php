<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class ProductController extends Controller {

    public function index( Request $request)
    {

$products = Product::with('category')->get()->map(function ($p) {
    return [
            'id' => $p->id,
            'name' => $p->name,
            'price' => $p->price,
            'originalPrice' => $p->sale_price,
            'image' => $p->image_url,
            'isOnSale' => $p->sale_price < $p->price,
            'isInWishlist' => false, 
            'category' => [
                'name' => $p->category->name ?? 'Unknown'
              ]
            ];
});

        return Inertia::render('Products/Index', [
            'products' => $products,
            'selectedCategory' => 'all',
    ]);
  } 
}