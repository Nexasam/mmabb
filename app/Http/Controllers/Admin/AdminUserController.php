<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(): Response
    {
        $users = User::latest()->paginate(20);

        $counts = [
            'total' => User::count(),
            'admin' => User::where('role', UserRole::Admin)->count(),
            'user' => User::where('role', UserRole::User)->count(),
        ];

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'counts' => $counts,
        ]);
    }

    public function destroy(User $user): RedirectResponse
    {
        // Prevent deleting yourself
        if ($user->id === auth()->id()) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'You cannot delete your own account.']);
            return back();
        }

        $user->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'User deleted.']);

        return back();
    }
}
