<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Application>
 */
class ApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'course_id' => Course::factory(),
            'full_name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'professional_background' => $this->faker->paragraph(),
            'status' => 'pending',
            'admin_notes' => null,
        ];
    }

    /**
     * Mark the application as approved.
     */
    public function approved(): static
    {
        return $this->state(['status' => 'approved']);
    }

    /**
     * Mark the application as rejected.
     */
    public function rejected(): static
    {
        return $this->state(['status' => 'rejected', 'admin_notes' => $this->faker->sentence()]);
    }
}
