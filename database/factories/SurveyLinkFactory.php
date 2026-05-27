<?php

namespace Database\Factories;

use App\Models\SurveyLink;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<SurveyLink>
 */
class SurveyLinkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->optional()->sentence(),
            'url' => $this->faker->url(),
            'token' => Str::random(12),
            'is_active' => true,
        ];
    }
}
