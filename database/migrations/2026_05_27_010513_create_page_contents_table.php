<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('page_contents', function (Blueprint $table) {
            $table->id();
            $table->string('page')->default('home'); // which page this belongs to
            $table->string('key')->unique();         // e.g. 'hero.headline'
            $table->string('label');                 // human-readable label for the admin
            $table->string('type')->default('text'); // text | textarea | json
            $table->longText('value')->nullable();
            $table->timestamps();

            $table->index('page');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_contents');
    }
};
