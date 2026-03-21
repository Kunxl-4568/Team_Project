<?php

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
        Schema::table('products', function (Blueprint $table) {
            if (!Schema::hasColumn('products', 'low_stock_threshold')) {
                $table->integer('low_stock_threshold')->default(5)->after('stock_quantity');
            }
            if (!Schema::hasColumn('products', 'stock_status')) {
                $table->string('stock_status')->default('in_stock')->after('low_stock_threshold');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            if (Schema::hasColumn('products', 'stock_status')) {
                $table->dropColumn('stock_status');
            }
            if (Schema::hasColumn('products', 'low_stock_threshold')) {
                $table->dropColumn('low_stock_threshold');
            }
        });
    }
};
