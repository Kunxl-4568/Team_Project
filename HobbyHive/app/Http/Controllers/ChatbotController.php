<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

class ChatbotController extends Controller
{
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $apiKey = config('services.anthropic.api_key');
        
        if (!$apiKey) {
            Log::error('Anthropic API key not configured');
            return response()->json([
                'reply' => 'Chatbot is not configured.',
            ], 500);
        }

        // ========================================
        // Get products from database
        // ========================================
        
        try {
            $products = Product::select('product_id', 'name', 'description', 'price', 'sale_price', 'stock_quantity')
                ->where('stock_quantity', '>', 0)
                ->orderBy('name')
                ->take(30)
                ->get();
            
            Log::info('Products fetched', [
                'count' => $products->count(),
            ]);

            if ($products->isEmpty()) {
                $productContext = "Currently no products in stock.";
            } else {
                $productContext = $products->map(function($product) {
                    $displayPrice = $product->sale_price ?? $product->price;
                    
                    $productLine = sprintf(
                        "• %s - $%s - %s (Stock: %d)",
                        $product->name,
                        number_format($displayPrice, 2),
                        $product->description ?? 'No description',
                        $product->stock_quantity
                    );
                    
                    // Add sale indicator
                    if ($product->sale_price && $product->sale_price < $product->price) {
                        $productLine .= " 🔥 ON SALE! (was $" . number_format($product->price, 2) . ")";
                    }
                    
                    return $productLine;
                })->join("\n");
            }
            
        } catch (\Exception $e) {
            Log::error('Error fetching products', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            $productContext = "Product information temporarily unavailable.";
        }

        // ========================================
        // Call Claude API
        // ========================================
        
        $client = new Client(['timeout' => 30]);

        try {
            $response = $client->post('https://api.anthropic.com/v1/messages', [
                'headers' => [
                    'x-api-key' => $apiKey,
                    'anthropic-version' => '2023-06-01',
                    'content-type' => 'application/json',
                ],
                'json' => [
                    'model' => 'claude-opus-4-6',
                    'max_tokens' => 1024,
                    'system' => "You are a helpful customer service assistant for HobbyHive, an e-commerce platform selling hobby and craft supplies.

CURRENT PRODUCTS IN STOCK:
{$productContext}

INSTRUCTIONS:
- Use the product list above to answer customer questions
- Recommend products with prices and descriptions
- Mention if items are on sale
- Check stock availability before recommending
- If asked about shipping: 'We offer free shipping on orders over $50'
- If asked about returns: 'We accept returns within 30 days'
- Be friendly, helpful, and concise",
                    
                    'messages' => [
                        [
                            'role' => 'user',
                            'content' => $request->message,
                        ],
                    ],
                ],
            ]);

            $data = json_decode($response->getBody(), true);
            $reply = $data['content'][0]['text'] ?? 'No response received';

            Log::info('Chatbot success');

            return response()->json([
                'reply' => $reply,
                'success' => true,
            ]);

        } catch (\Exception $e) {
            Log::error('Chatbot API Error', [
                'error' => $e->getMessage(),
            ]);
            
            return response()->json([
                'reply' => 'Sorry, I\'m having trouble connecting. Please try again.',
                'success' => false,
            ], 500);
        }
    }
}