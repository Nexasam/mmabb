<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateApplicationStatusRequest;
use App\Models\Application;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminApplicationController extends Controller
{
    /**
     * Display all applications with optional status filter.
     */
    public function index(): Response
    {
        $status = request()->query('status');

        $applications = Application::with(['user:id,name', 'course:id,title'])
            ->when($status, fn ($query) => $query->where('status', $status))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        $counts = [
            'total' => Application::count(),
            'pending' => Application::where('status', 'pending')->count(),
            'approved' => Application::where('status', 'approved')->count(),
            'rejected' => Application::where('status', 'rejected')->count(),
        ];

        return Inertia::render('admin/applications/index', [
            'applications' => $applications,
            'counts' => $counts,
            'filters' => ['status' => $status],
        ]);
    }

    /**
     * Update the status of an application.
     */
    public function update(UpdateApplicationStatusRequest $request, Application $application): RedirectResponse
    {
        $application->update($request->validated());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Application status updated to '.$application->fresh()->status.'.',
        ]);

        return back();
    }
}
