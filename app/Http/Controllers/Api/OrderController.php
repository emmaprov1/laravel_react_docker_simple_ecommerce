<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $data = Order::with("user")->with("cart")->withCount("cart")->get();

        return response()->json(['status' => 'success', 'data' => $data])->setStatusCode(200);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $transaction_id)
    {
        $data = Order::where("transaction_id", $transaction_id)
            ->with("user")
            ->with("AllCartProduct")
            ->withCount("cart")->first();
        return response()->json(['status' => 'success', 'data' => $data])->setStatusCode(200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function updateStatus(Request $request)
    {
        try {
            Order::where("transaction_id", $request->input('transactionId'))
                ->limit(1)
                ->update(
                    ["completed_status" => $request->input('status')]
                );

            return response()->json(['status' => 'success', 'message' => "Order updated succefully"])->setStatusCode(200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()])->setStatusCode(401);
        }
    }

    public function customers($userId)
    {
        $data = Order::where("user_id", $userId)->with("user")->with("cart")->withCount("cart")->get();

        return response()->json(['status' => 'success', 'data' => $data])->setStatusCode(200);
    }
}
