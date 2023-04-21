<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::factory()
            ->count(3)
            ->sequence(
                ["name" => "ROLE_ADMIN"],
                ["name" => "ROLE_SUPERADMIN"],
                ["name" => "ROLE_CUSTOMER"]
            )
            ->create();
    }
}
