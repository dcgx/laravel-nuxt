<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ResetPasswordTest extends TestCase
{
    /** @test */
    public function can_reset_password()
    {
        // $user = User::factory()->create();

        // $this->postJson('/api/password/reset', [
        //     'token' => '',
        //     'email' => $user->email,
        //     'password' => '',
        //     'password_confirmation' => ''
        // ]);
        
        //
    }
}
