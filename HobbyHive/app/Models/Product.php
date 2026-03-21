<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    public $incrementing = true;
    protected $keyType = 'int';
    protected $primaryKey = 'product_id';

        protected $fillable = [
        'name',
        'description',
        'price',
        'sale_price',
        'category_id',
        'image_url',
        'stock_quantity',
        'low_stock_threshold',
        'stock_status',
    ];

    public function category() {
        return $this->belongsTo(Category::class, 'category_id'); // A product belongs to a category
    }
    protected static function booted()
{
    static::saving(function ($product) {
        if ($product->stock_quantity <= 0) {
            $product->stock_status = 'out_of_stock';
        } elseif ($product->stock_quantity <= $product->low_stock_threshold) {
            $product->stock_status = 'low_stock';
        } else {
            $product->stock_status = 'in_stock';
        }
    });
}
}
