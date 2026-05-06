<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a default admin user
        User::firstOrCreate(
            ['email' => 'admin@mmabconsulting.com'],
            [
                'name' => 'Admin',
                'email' => 'admin@mmabconsulting.com',
                'password' => 'password',
                'role' => 'admin',
                'email_verified_at' => now(),
            ],
        );

        $this->call([
            CourseSeeder::class,
        ]);
    }
}
