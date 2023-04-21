<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public function User()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function Cart()
    {
        return $this->hasMany(Cart::class, 'order_id', 'id');
    }

    public function AllCartProduct()
    {
        return $this->Cart()->with('product');
    }
}
