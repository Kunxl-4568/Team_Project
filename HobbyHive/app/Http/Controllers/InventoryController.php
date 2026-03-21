<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->filled('search')) {
            $search = $request->string('search')->trim();

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $status = $request->status;

            if ($status === 'in_stock') {
                $query->whereColumn('stock_quantity', '>', 'low_stock_threshold');
            } elseif ($status === 'low_stock') {
                $query->where('stock_quantity', '>', 0)
                      ->whereColumn('stock_quantity', '<=', 'low_stock_threshold');
            } elseif ($status === 'out_of_stock') {
                $query->where('stock_quantity', '<=', 0);
            }
        }

        $products = $query
            ->latest()
            ->paginate(10)
            ->through(function ($product) {
                return [
                    'product_id' => $product->product_id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'price' => $product->price,
                    'sale_price' => $product->sale_price,
                    'image_url' => $product->image_url ? asset($product->image_url) : null,
                    'category' => is_string($product->category)
                        ? $product->category
                        : (optional($product->category)->name ?? 'Uncategorized'),
                    'stock_quantity' => $product->stock_quantity,
                    'low_stock_threshold' => $product->low_stock_threshold,
                    'stock_status' => $this->getStockStatus(
                        $product->stock_quantity,
                        $product->low_stock_threshold
                    ),
                ];
            })
            ->withQueryString();

        $alerts = Product::query()
            ->where(function ($query) {
                $query->where('stock_quantity', '<=', 0)
                      ->orWhere(function ($q) {
                          $q->where('stock_quantity', '>', 0)
                            ->whereColumn('stock_quantity', '<=', 'low_stock_threshold');
                      });
            })
            ->latest()
            ->get()
            ->map(function ($product) {
                $status = $this->getStockStatus(
                    $product->stock_quantity,
                    $product->low_stock_threshold
                );

                return [
                    'product_id' => $product->product_id,
                    'name' => $product->name,
                    'stock_quantity' => $product->stock_quantity,
                    'low_stock_threshold' => $product->low_stock_threshold,
                    'stock_status' => $status,
                    'message' => $status === 'out_of_stock'
                        ? "{$product->name} is currently out of stock."
                        : "{$product->name} is running low on stock.",
                ];
            });

        $report = [
            'total_products' => Product::count(),
            'in_stock' => Product::whereColumn('stock_quantity', '>', 'low_stock_threshold')->count(),
            'low_stock' => Product::where('stock_quantity', '>', 0)
                ->whereColumn('stock_quantity', '<=', 'low_stock_threshold')
                ->count(),
            'out_of_stock' => Product::where('stock_quantity', '<=', 0)->count(),
        ];

        return Inertia::render('admin/inventory', [
            'products' => $products,
            'alerts' => $alerts,
            'report' => $report,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function addStock(Request $request, $id)
    {
        $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $product = Product::findOrFail($id);

        $product->stock_quantity += $request->quantity;
        $product->stock_status = $this->getStockStatus(
            $product->stock_quantity,
            $product->low_stock_threshold
        );
        $product->save();

        return redirect()
            ->route('admin.inventory')
            ->with('success', "Stock added successfully for {$product->name}.");
    }

    public function removeStock(Request $request, $id)
    {
        $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $product = Product::findOrFail($id);

        if ($request->quantity > $product->stock_quantity) {
            return redirect()
                ->route('admin.inventory')
                ->with('error', "Cannot remove more stock than available for {$product->name}.");
        }

        $product->stock_quantity -= $request->quantity;
        $product->stock_status = $this->getStockStatus(
            $product->stock_quantity,
            $product->low_stock_threshold
        );
        $product->save();

        return redirect()
            ->route('admin.inventory')
            ->with('success', "Stock removed successfully for {$product->name}.");
    }

    private function getStockStatus(int $stockQuantity, int $lowStockThreshold): string
    {
        if ($stockQuantity <= 0) {
            return 'out_of_stock';
        }

        if ($stockQuantity <= $lowStockThreshold) {
            return 'low_stock';
        }

        return 'in_stock';
    }
}