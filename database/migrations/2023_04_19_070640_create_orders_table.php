<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->integer('deleted')->default(0);
            $table->string('transaction_id')->default(1)->unique();
            $table->text('delivery_address');
            $table->text('state');
            $table->text('country');
            $table->integer('completed_status')->default(0);
            $table->enum('payment_status', ['paid', 'unpaid', 'pending'])->default("unpaid");
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
