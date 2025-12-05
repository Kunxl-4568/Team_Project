<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class ProductController extends Controller {

    public function index( Request $request)
    {
        $selectedCategory = $request->query('category', 'all');
        $searchQuery = $request->query('search',null);

        $productQuery = Product::with('category');

     if ($selectedCategory !== 'all') {
      $categoryName = str_replace('-',' ', $selectedCategory);
      $categoryName = str_replace(' and ' , ' & ', $categoryName);
      $categoryName = ucwords($categoryName);

        $productQuery->whereHas('category', function ($query) use ($categoryName) {
           $query->where('name', $categoryName); 
        });
     }

     if ($searchQuery) {
      $productQuery->where('name', 'like', "%{$searchQuery}%");
     }

$products = $productQuery->get()->map(function ($product) {

  $onSale = $product->sale_price !== null && $product->sale_price < $product->price;
    return [
            'id' => $product->product_id,
            'name' => $product->name,
            'price' => $onSale ? $product->sale_price : $product->price,
            'originalPrice' => $onSale ? $product->price : null,
            'image' => $product->image_url,
            'isOnSale' => $product->sale_price < $product->price,
            'isInWishlist' => false, 
            'category' => [
                'name' => $product->category->name ?? 'Unknown'
              ]
            ];
});

        return Inertia::render('Products/Index', [
            'products' => $products,
            'selectedCategory' => $selectedCategory,
            'searchQuery' => $searchQuery,
    ]);
  } 
}