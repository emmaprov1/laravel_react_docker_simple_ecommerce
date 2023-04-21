<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleUser extends Model
{
    use HasFactory;

    protected $table = "role_user";

    public function User()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function Order()
    {
        return $this->hasMany(Order::class, 'user_id', 'user_id');
    }
}
