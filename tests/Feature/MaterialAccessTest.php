<?php

use App\Models\Application;
use App\Models\Course;
use App\Models\Material;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

describe('material access control', function () {
    it('allows approved applicants to download materials', function () {
        Storage::fake('private');

        $user = User::factory()->create();
        $course = Course::factory()->create();
        Application::factory()->approved()->create(['user_id' => $user->id, 'course_id' => $course->id]);

        $file = UploadedFile::fake()->create('workbook.pdf', 100, 'application/pdf');
        $path = $file->store('materials', 'private');

        $material = Material::factory()->create([
            'course_id' => $course->id,
            'file_path' => $path,
            'file_name' => 'workbook.pdf',
        ]);

        actingAs($user)
            ->get("/materials/{$material->id}/download")
            ->assertOk();
    });

    it('blocks unapproved applicants from downloading materials', function () {
        $user = User::factory()->create();
        $course = Course::factory()->create();
        Application::factory()->create(['user_id' => $user->id, 'course_id' => $course->id, 'status' => 'pending']);

        $material = Material::factory()->create(['course_id' => $course->id]);

        actingAs($user)
            ->get("/materials/{$material->id}/download")
            ->assertForbidden();
    });

    it('blocks unauthenticated users from downloading materials', function () {
        $material = Material::factory()->create();

        get("/materials/{$material->id}/download")
            ->assertRedirect('/login');
    });

    it('shows materials page only for approved courses', function () {
        $user = User::factory()->create();
        $course = Course::factory()->create();
        Application::factory()->approved()->create(['user_id' => $user->id, 'course_id' => $course->id]);

        actingAs($user)
            ->get('/my-materials')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('materials/index')
                ->has('courses', 1),
            );
    });
});
