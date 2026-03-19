<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class CartItem extends Model
{
    protected $fillable = ['cart_id', 'product_product_id', 'quantity', 'price'];

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_product_id', 'product_id');
    }

    // Calculate subtotal for this item
    public function getSubtotal()
    {
        return $this->quantity * $this->price;
    }
}