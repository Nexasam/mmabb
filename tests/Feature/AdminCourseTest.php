<?php

use App\Models\Course;
use App\Models\User;

use function Pest\Laravel\actingAs;

describe('admin courses', function () {
    it('allows admins to view the courses page', function () {
        $admin = User::factory()->create(['role' => 'admin']);
        Course::factory()->count(2)->create();

        actingAs($admin)
            ->get('/admin/courses')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('admin/courses/index')->has('courses', 2));
    });

    it('blocks non-admins from the courses admin page', function () {
        $user = User::factory()->create(['role' => 'user']);

        actingAs($user)
            ->get('/admin/courses')
            ->assertForbidden();
    });

    it('allows admins to create a course', function () {
        $admin = User::factory()->create(['role' => 'admin']);

        actingAs($admin)
            ->post('/admin/courses', [
                'title'               => 'New Test Course',
                'description'         => 'A short description for the test course.',
                'overview'            => 'A longer overview.',
                'accreditation'       => 'CPD Accredited',
                'duration'            => '2 Days',
                'location'            => 'Online',
                'price'               => '199.00',
                'is_active'           => true,
                'learning_objectives' => ['Objective one', 'Objective two'],
                'curriculum'          => [
                    ['day' => 'Day 1', 'title' => 'Introduction', 'topics' => ['Topic A', 'Topic B']],
                ],
            ])
            ->assertRedirect();

        $course = Course::where('title', 'New Test Course')->first();
        expect($course)->not->toBeNull();
        expect($course->slug)->toBe('new-test-course');
        expect($course->price)->toBe('199.00');
        expect($course->learning_objectives)->toBe(['Objective one', 'Objective two']);
    });

    it('validates required fields on create', function () {
        $admin = User::factory()->create(['role' => 'admin']);

        actingAs($admin)
            ->post('/admin/courses', [])
            ->assertSessionHasErrors(['title', 'description', 'price']);
    });

    it('allows admins to update a course', function () {
        $admin  = User::factory()->create(['role' => 'admin']);
        $course = Course::factory()->create(['title' => 'Old Title', 'price' => '100.00']);

        actingAs($admin)
            ->put("/admin/courses/{$course->id}", [
                'title'       => 'Updated Title',
                'description' => $course->description,
                'price'       => '250.00',
                'is_active'   => true,
            ])
            ->assertRedirect();

        expect($course->fresh()->title)->toBe('Updated Title');
        expect($course->fresh()->price)->toBe('250.00');
    });

    it('prevents duplicate course titles', function () {
        $admin = User::factory()->create(['role' => 'admin']);
        Course::factory()->create(['title' => 'Existing Course']);

        actingAs($admin)
            ->post('/admin/courses', [
                'title'       => 'Existing Course',
                'description' => 'Some description.',
                'price'       => '0',
                'is_active'   => true,
            ])
            ->assertSessionHasErrors(['title']);
    });

    it('allows admins to delete a course', function () {
        $admin  = User::factory()->create(['role' => 'admin']);
        $course = Course::factory()->create();

        actingAs($admin)
            ->delete("/admin/courses/{$course->id}")
            ->assertRedirect();

        expect(Course::find($course->id))->toBeNull();
    });
});
