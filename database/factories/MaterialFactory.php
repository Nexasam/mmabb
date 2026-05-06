<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Material>
 */
class MaterialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'course_id' => Course::factory(),
            'title' => $this->faker->sentence(3),
            'file_path' => 'materials/'.$this->faker->uuid().'.pdf',
            'file_name' => $this->faker->word().'.pdf',
            'file_size' => $this->faker->numberBetween(50000, 5000000),
            'sort_order' => 0,
        ];
    }
}
