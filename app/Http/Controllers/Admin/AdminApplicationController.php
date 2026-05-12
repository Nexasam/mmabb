<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ApplicationStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateApplicationStatusRequest;
use App\Models\Application;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminApplicationController extends Controller
{
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
            'pending' => Application::where('status', ApplicationStatus::Pending->value)->count(),
            'approved' => Application::where('status', ApplicationStatus::Approved->value)->count(),
            'rejected' => Application::where('status', ApplicationStatus::Rejected->value)->count(),
        ];

        return Inertia::render('admin/applications/index', [
            'applications' => $applications,
            'counts' => $counts,
            'filters' => ['status' => $status],
        ]);
    }

    public function update(UpdateApplicationStatusRequest $request, Application $application): RedirectResponse
    {
        $application->update($request->validated());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Application status updated to '.$application->fresh()->status->value.'.',
        ]);

        return back();
    }
}
