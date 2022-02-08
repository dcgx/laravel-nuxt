<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\User;

class UserTest extends TestCase
{
    /** @test */
    public function can_fetch_the_current_user()
    {
        $this->actingAs(User::factory()->create())
            ->getJson('/api/user')
            ->assertSuccessful()
            ->assertJsonStructure(['id', 'name', 'email']);
    }
}
