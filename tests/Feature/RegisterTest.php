<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\User;

class RegisterTest extends TestCase
{
    /** @test */
    public function can_register()
    {
        $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@test.app',
            'password' => 'secret',
            'password_confirmation' => 'secret',
        ])
            ->assertSuccessful()
            ->assertJsonStructure(['id', 'name', 'email']);
    }

    /** @test */
    public function can_not_register_with_existing_email()
    {
        User::factory()->create(['email' => 'test@test.app']);

        $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@test.app',
            'password' => 'secret',
            'password_confirmation' => 'secret',
        ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }
}
