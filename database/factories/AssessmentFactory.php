<?php

namespace Database\Factories;

use App\Models\Assessment;
use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Assessment>
 */
class AssessmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'course_id' => Course::factory(),
            'title' => $this->faker->sentence(4),
            'instructions' => $this->faker->paragraph(),
            'questions' => [
                ['question' => $this->faker->sentence().'?', 'marks' => 20],
                ['question' => $this->faker->sentence().'?', 'marks' => 20],
                ['question' => $this->faker->sentence().'?', 'marks' => 20],
                ['question' => $this->faker->sentence().'?', 'marks' => 20],
                ['question' => $this->faker->sentence().'?', 'marks' => 20],
            ],
            'time_limit_minutes' => 60,
            'is_active' => true,
        ];
    }

    public function inactive(): static
    {
        return $this->state(['is_active' => false]);
    }
}
