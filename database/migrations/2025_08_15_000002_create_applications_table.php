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
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->text('professional_background');
            $table->string('status')->default('pending');
            $table->text('admin_notes')->nullable();
            $table->timestamps();

            $table->unique(['email', 'course_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
