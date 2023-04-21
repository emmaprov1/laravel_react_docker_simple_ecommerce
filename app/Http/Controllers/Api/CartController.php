<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CartController extends Controller
{
    public function index($user_id)
    {

        $data = Cart::Where("user_id", $user_id)
            ->where("status", 0)
            ->with("user")
            ->with("product")
            ->get();

        return response()->json(['status' => 'success', 'data' => $data])->setStatusCode(200);
    }


    public function addToCart(Request $request)
    {
        try {

            $cart = new Cart();
            $cart->product_id = $request->product_id;
            $cart->user_id = $request->user_id;
            $cart->quantity = $request->quantity;
            $cart->save();

            return response()->json(['status' => 'success', 'message' => "Item added to cart"])->setStatusCode(200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()])->setStatusCode(401);
        }
    }



    public function removeFromCart($id)
    {
        try {
            Cart::whereId($id)->delete();
            return response()->json(['status' => 'success', 'message' => "Item removed"])->setStatusCode(200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()])->setStatusCode(401);
        }
    }


    public function checkout(Request $request)
    {
        try {

            $transaction_id = Str::upper(Str::random(8));

            $user_id  =  $request->get('user_id');

            $order = new Order();
            $order->user_id = $user_id;
            $order->transaction_id = $transaction_id;
            $order->delivery_address = $request->get('address');
            $order->state = $request->get('state');
            $order->country = $request->get('country');
            $order->payment_status = 'paid';
            $order->completed_status = 1;
            $order->save();

            Cart::Where("user_id", $user_id)->where("status", 0)
                ->update([
                    "status" => 1,
                    "order_id" => $order->id
                ]);

            return response()->json(['status' => 'success', 'message' => "Order completed"])->setStatusCode(200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()])->setStatusCode(401);
        }
    }
}
