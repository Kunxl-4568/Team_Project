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
        Schema::create('contact_pages', function (Blueprint $table) {
        $table->id();

        //User details saved
        $table->string('phone')->nullable();
        $table->string('email');
        $table->string('first_name');
        $table->string('last_name');
        // stores + send the message user writes
        $table->text('message');
        $table->timestamps();// created at/updated at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_pages');
    }
};
