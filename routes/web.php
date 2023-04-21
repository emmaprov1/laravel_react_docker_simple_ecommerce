<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/admin', [App\Http\Controllers\AdminController::class, 'index'])->name('adminHome');

Route::get('/superadmin', [App\Http\Controllers\SuperAdminController::class, 'index'])->name('superAdminHome');

Route::get('/products', [App\Http\Controllers\ProductController::class, 'index'])->name('allProduct');

Route::get('/cart', [App\Http\Controllers\CartController::class, 'index'])->name('cart');
Route::get('/checkout', [App\Http\Controllers\CartController::class, 'checkout'])->name('checkout');
Route::get('/orders', [App\Http\Controllers\OrderController::class, 'index'])->name('orders');
Route::get('/orders/{transaction_id}', [App\Http\Controllers\OrderController::class, 'show'])->name('orders_detail');

Route::get('/customer', [App\Http\Controllers\CustomerController::class, 'index'])->name('customer');
Route::get('/customer/orders/{user_id}', [App\Http\Controllers\OrderController::class, 'customers'])->name('customers.orders');



Route::get('/migrate', function () {
    Artisan::call('migrate');
    return Artisan::output();
});
