<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'    => $this->faker->sentence($nbWords = 6, $variableNbWords = true), // $this->faker->title,
            'price'   => $this->faker->randomNumber(3),
            'stock'   => $this->faker->randomNumber(3),
            'user_id' => 1,
            'image'   => $this->faker->imageUrl($width = 640, $height = 480),
        ];
    }
}
