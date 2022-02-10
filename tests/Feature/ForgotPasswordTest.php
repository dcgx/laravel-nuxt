<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ForgotPasswordTest extends TestCase
{
    /** @test */
    public function can_forgot_password()
    {
        $user = User::factory()->create();

        $this->postJson('/api/password/email', ['email' => $user->email])
            ->assertSuccessful()
            ->assertJsonFragment(['status' => 'We have emailed your password reset link!']);
    }
}
