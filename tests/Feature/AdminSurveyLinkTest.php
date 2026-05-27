<?php

use App\Enums\UserRole;
use App\Models\SurveyLink;
use App\Models\User;

beforeEach(function () {
    $this->admin = User::factory()->create(['role' => UserRole::Admin]);
    $this->user = User::factory()->create(['role' => UserRole::User]);
});

// ─── Public redirect ──────────────────────────────────────────────────────────

it('redirects to the survey url when token is valid and active', function () {
    $link = SurveyLink::factory()->create([
        'url' => 'https://forms.google.com/test',
        'is_active' => true,
    ]);

    $this->get(route('survey.redirect', $link->token))
        ->assertRedirect('https://forms.google.com/test');
});

it('returns 404 for an inactive survey link', function () {
    $link = SurveyLink::factory()->create(['is_active' => false]);

    $this->get(route('survey.redirect', $link->token))
        ->assertNotFound();
});

it('returns 404 for an unknown token', function () {
    $this->get(route('survey.redirect', 'nonexistent'))
        ->assertNotFound();
});

// ─── Admin index ──────────────────────────────────────────────────────────────

it('allows admin to view survey links index', function () {
    SurveyLink::factory()->count(3)->create();

    $this->actingAs($this->admin)
        ->get('/admin/survey-links')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/survey-links/index')
            ->has('surveyLinks', 3)
        );
});

it('denies non-admin access to survey links index', function () {
    $this->actingAs($this->user)
        ->get('/admin/survey-links')
        ->assertForbidden();
});

// ─── Admin store ──────────────────────────────────────────────────────────────

it('allows admin to create a survey link', function () {
    $this->actingAs($this->admin)
        ->post('/admin/survey-links', [
            'title' => 'Post-Session Feedback',
            'description' => 'Day 1 survey',
            'url' => 'https://forms.google.com/abc',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('survey_links', [
        'title' => 'Post-Session Feedback',
        'url' => 'https://forms.google.com/abc',
    ]);
});

it('validates required fields when creating a survey link', function () {
    $this->actingAs($this->admin)
        ->post('/admin/survey-links', [])
        ->assertSessionHasErrors(['title', 'url']);
});

it('validates that url is a valid url', function () {
    $this->actingAs($this->admin)
        ->post('/admin/survey-links', [
            'title' => 'Test',
            'url' => 'not-a-url',
        ])
        ->assertSessionHasErrors(['url']);
});

// ─── Admin update ─────────────────────────────────────────────────────────────

it('allows admin to update a survey link', function () {
    $link = SurveyLink::factory()->create();

    $this->actingAs($this->admin)
        ->put("/admin/survey-links/{$link->id}", [
            'title' => 'Updated Title',
            'url' => 'https://forms.google.com/updated',
            'is_active' => false,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('survey_links', [
        'id' => $link->id,
        'title' => 'Updated Title',
        'is_active' => false,
    ]);
});

// ─── Admin destroy ────────────────────────────────────────────────────────────

it('allows admin to delete a survey link', function () {
    $link = SurveyLink::factory()->create();

    $this->actingAs($this->admin)
        ->delete("/admin/survey-links/{$link->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('survey_links', ['id' => $link->id]);
});

// ─── Token generation ─────────────────────────────────────────────────────────

it('auto-generates a unique token on creation', function () {
    $link = SurveyLink::factory()->create();

    expect($link->token)->not->toBeEmpty();
    expect(strlen($link->token))->toBe(12);
});

it('generates unique tokens for each survey link', function () {
    $links = SurveyLink::factory()->count(10)->create();
    $tokens = $links->pluck('token')->unique();

    expect($tokens)->toHaveCount(10);
});
