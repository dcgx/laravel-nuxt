<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class LoginTest extends TestCase
{
    /** @test */
    public function can_login()
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password',
            'device' => 'mobile'
        ])
            ->assertSuccessful()
            ->assertJsonStructure(['token', 'expires_in'])
            ->assertJson(['token_type' => 'bearer']);

    }

    /** @test */
    public function can_logout()
    {
        $token = $this->postJson('/api/login', [
            'email' => User::factory()->create()->email,
            'password' => 'password',
            'device' => 'device'
        ])->json()['token'];

        $this->postJson("/api/logout?token=$token")
            ->assertSuccessful();

        $this->getJson("/api/user?token=$token")
            ->assertStatus(401);
    }

}
