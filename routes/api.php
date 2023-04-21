<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/products', [App\Http\Controllers\Api\ProductController::class, 'index'])->name('allProduct');
Route::post('/cart/add', [App\Http\Controllers\Api\CartController::class, 'addToCart'])->name('addToCart');
Route::delete('/cart/delete/{id}', [App\Http\Controllers\Api\CartController::class, 'removeFromCart'])->name('removeFromCart');

Route::get('/cart/{user_id}', [App\Http\Controllers\Api\CartController::class, 'index'])->name('cart');
Route::post('/checkout/add', [App\Http\Controllers\Api\CartController::class, 'checkout'])->name('checkout_final');

Route::get('/orders', [App\Http\Controllers\Api\OrderController::class, 'index'])->name('order_list');
Route::get('/orders/{transaction_id}', [App\Http\Controllers\Api\OrderController::class, 'show'])->name('order_detail');
Route::post('/orders/update', [App\Http\Controllers\Api\OrderController::class, 'updateStatus'])->name('order_update_status');
Route::get('/customer/orders/{user_id}', [App\Http\Controllers\Api\OrderController::class, 'customers'])->name('customers.orders');

Route::get('/customer', [App\Http\Controllers\Api\CustomerController::class, 'index'])->name('customer');
Route::delete('/customer/{user_id}', [App\Http\Controllers\Api\CustomerController::class, 'destroy'])->name('customer_destroy');
