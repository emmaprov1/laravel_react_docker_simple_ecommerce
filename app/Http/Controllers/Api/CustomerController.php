<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Http\Request;

class CustomerController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $role = Role::Where("name", "ROLE_SUPERADMIN")->orWhere("name", "ROLE_ADMIN")->pluck('id');

        $user =  RoleUser::whereNotIn("role_id", $role)->with("user")->withCount("order")->get();

        return response()->json(['status' => 'success', 'data' => $user])->setStatusCode(200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        try {
            User::whereId($id)
                ->limit(1)
                ->delete();

            return response()->json(['status' => 'success', 'message' => "Customer deleted succefully"])->setStatusCode(200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()])->setStatusCode(401);
        }
    }
}
