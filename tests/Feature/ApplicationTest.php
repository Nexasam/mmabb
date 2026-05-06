<?php

use App\Models\Application;
use App\Models\Course;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

describe('public application form', function () {
    it('shows the application form for an active course', function () {
        $course = Course::factory()->create();

        get("/courses/{$course->slug}/apply")
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('applications/create'));
    });

    it('returns 404 for an inactive course', function () {
        $course = Course::factory()->inactive()->create();

        get("/courses/{$course->slug}/apply")->assertNotFound();
    });

    it('stores a new application', function () {
        $course = Course::factory()->create();

        post('/applications', [
            'course_id' => $course->id,
            'full_name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'phone' => '07700000000',
            'professional_background' => 'Paediatric nurse with 5 years experience.',
        ])->assertRedirect("/courses/{$course->slug}");

        expect(Application::where('email', 'jane@example.com')->exists())->toBeTrue();
    });

    it('prevents duplicate applications for the same course and email', function () {
        $course = Course::factory()->create();
        Application::factory()->create(['course_id' => $course->id, 'email' => 'jane@example.com']);

        post('/applications', [
            'course_id' => $course->id,
            'full_name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'phone' => '07700000000',
            'professional_background' => 'Duplicate submission.',
        ])->assertSessionHasErrors('email');
    });
});

describe('authenticated user applications', function () {
    it('shows the user their own applications', function () {
        $user = User::factory()->create();
        Application::factory()->count(2)->create(['user_id' => $user->id]);

        actingAs($user)
            ->get('/my-applications')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('applications/index')
                ->has('applications', 2),
            );
    });

    it('does not show other users applications', function () {
        $user = User::factory()->create();
        Application::factory()->count(3)->create(); // belongs to other users

        actingAs($user)
            ->get('/my-applications')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->has('applications', 0));
    });
});
