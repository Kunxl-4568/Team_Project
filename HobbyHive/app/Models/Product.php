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
    ];

    public function category() {
        return $this->belongsTo(Category::class); // A product belongs to a category
    }
}
