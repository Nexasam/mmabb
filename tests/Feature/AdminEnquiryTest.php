<?php

use App\Models\Enquiry;
use App\Models\User;

use function Pest\Laravel\actingAs;

describe('contact form enquiries', function () {
    it('stores a public enquiry submission', function () {
        $this->post('/enquiries', [
            'name'    => 'Jane Smith',
            'email'   => 'jane@example.com',
            'phone'   => '07700 900 123',
            'subject' => 'Course enquiry',
            'message' => 'I would like to know more about the paediatric complex care course.',
        ])->assertRedirect();

        $enquiry = Enquiry::where('email', 'jane@example.com')->first();
        expect($enquiry)->not->toBeNull();
        expect($enquiry->name)->toBe('Jane Smith');
        expect($enquiry->is_read)->toBeFalse();
    });

    it('validates required fields on enquiry submission', function () {
        $this->post('/enquiries', [])->assertSessionHasErrors(['name', 'email', 'message']);
    });

    it('validates email format', function () {
        $this->post('/enquiries', [
            'name'    => 'Jane Smith',
            'email'   => 'not-an-email',
            'message' => 'Hello',
        ])->assertSessionHasErrors(['email']);
    });

    it('allows admins to view enquiries', function () {
        $admin = User::factory()->create(['role' => 'admin']);
        Enquiry::factory()->count(3)->create();

        actingAs($admin)
            ->get('/admin/enquiries')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('admin/enquiries/index')
                ->has('enquiries.data', 3)
                ->has('counts')
            );
    });

    it('blocks non-admins from the enquiries admin page', function () {
        $user = User::factory()->create(['role' => 'user']);

        actingAs($user)
            ->get('/admin/enquiries')
            ->assertForbidden();
    });

    it('allows admins to mark an enquiry as read', function () {
        $admin   = User::factory()->create(['role' => 'admin']);
        $enquiry = Enquiry::factory()->unread()->create();

        actingAs($admin)
            ->patch("/admin/enquiries/{$enquiry->id}/read")
            ->assertRedirect();

        expect($enquiry->fresh()->is_read)->toBeTrue();
    });

    it('allows admins to delete an enquiry', function () {
        $admin   = User::factory()->create(['role' => 'admin']);
        $enquiry = Enquiry::factory()->create();

        actingAs($admin)
            ->delete("/admin/enquiries/{$enquiry->id}")
            ->assertRedirect();

        expect(Enquiry::find($enquiry->id))->toBeNull();
    });

    it('counts unread enquiries correctly', function () {
        $admin = User::factory()->create(['role' => 'admin']);
        Enquiry::factory()->count(2)->unread()->create();
        Enquiry::factory()->count(1)->read()->create();

        actingAs($admin)
            ->get('/admin/enquiries')
            ->assertInertia(fn ($page) => $page
                ->where('counts.total', 3)
                ->where('counts.unread', 2)
                ->where('counts.read', 1)
            );
    });
});
