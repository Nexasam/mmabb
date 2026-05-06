<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(4);

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.Str::random(4),
            'description' => $this->faker->paragraph(),
            'overview' => $this->faker->paragraphs(2, true),
            'learning_objectives' => $this->faker->sentences(5),
            'curriculum' => null,
            'accreditation' => 'CPD Accredited',
            'duration' => '3 Days',
            'location' => 'UK Venues',
            'price' => '595.00',
            'is_active' => true,
        ];
    }

    /**
     * Indicate the course is inactive.
     */
    public function inactive(): static
    {
        return $this->state(['is_active' => false]);
    }
}
