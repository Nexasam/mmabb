<?php

use App\Models\Application;
use App\Models\Course;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\patch;

describe('admin applications', function () {
    it('allows admins to view all applications', function () {
        $admin = User::factory()->create(['role' => 'admin']);
        Application::factory()->count(3)->create();

        actingAs($admin)
            ->get('/admin/applications')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('admin/applications/index'));
    });

    it('blocks non-admins from the admin area', function () {
        $user = User::factory()->create(['role' => 'user']);

        actingAs($user)
            ->get('/admin/applications')
            ->assertForbidden();
    });

    it('allows admins to update application status', function () {
        $admin = User::factory()->create(['role' => 'admin']);
        $application = Application::factory()->create(['status' => 'pending']);

        actingAs($admin)
            ->patch("/admin/applications/{$application->id}", [
                'status' => 'approved',
                'admin_notes' => 'Welcome aboard.',
            ])
            ->assertRedirect();

        expect($application->fresh()->status)->toBe('approved');
        expect($application->fresh()->admin_notes)->toBe('Welcome aboard.');
    });

    it('filters applications by status', function () {
        $admin = User::factory()->create(['role' => 'admin']);
        Application::factory()->count(2)->create(['status' => 'pending']);
        Application::factory()->count(1)->approved()->create();

        actingAs($admin)
            ->get('/admin/applications?status=pending')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->has('applications.data', 2));
    });
});
