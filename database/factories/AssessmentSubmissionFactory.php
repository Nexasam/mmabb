<?php

namespace Database\Factories;

use App\Models\Assessment;
use App\Models\AssessmentSubmission;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AssessmentSubmission>
 */
class AssessmentSubmissionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'assessment_id' => Assessment::factory(),
            'user_id' => User::factory(),
            'answers' => [],
            'started_at' => now()->subHour(),
            'submitted_at' => null,
            'score' => null,
            'marker_notes' => null,
            'marked_at' => null,
        ];
    }

    public function submitted(): static
    {
        return $this->state([
            'answers' => [
                ['question_index' => 0, 'answer' => $this->faker->paragraph()],
                ['question_index' => 1, 'answer' => $this->faker->paragraph()],
            ],
            'submitted_at' => now(),
        ]);
    }

    public function marked(): static
    {
        return $this->submitted()->state([
            'score' => $this->faker->numberBetween(40, 100),
            'marker_notes' => $this->faker->sentence(),
            'marked_at' => now(),
        ]);
    }
}
