<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cart extends Model
{
    use HasFactory;

   protected $fillable = [
  'user_id','session_id',
  'full_name','email','phone',
  'address_line1','address_line2','city','postcode','country',
  'payment_method',
  'status','checked_out_at',
];

    public function items()
    {
        return $this->hasMany(CartItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Calculate total
    public function getTotal()
    {
        return $this->items->sum(function ($item) {
            return $item->quantity * $item->price;
        });
    }
}
