<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Enquiry>
 */
class EnquiryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'    => fake()->name(),
            'email'   => fake()->safeEmail(),
            'phone'   => fake()->optional()->phoneNumber(),
            'subject' => fake()->optional()->sentence(4),
            'message' => fake()->paragraph(),
        ];
    }

    public function unread(): static
    {
        return $this->state(['is_read' => false]);
    }

    public function read(): static
    {
        return $this->state(['is_read' => true]);
    }
}
