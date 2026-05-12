<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateApplicationStatusRequest;
use App\Models\Application;
use App\Services\ApplicationService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminApplicationController extends Controller
{
    public function __construct(private readonly ApplicationService $applicationService) {}

    public function index(): Response
    {
        $status = request()->query('status');

        ['applications' => $applications, 'counts' => $counts] = $this->applicationService->getPaginatedForAdmin($status);

        return Inertia::render('admin/applications/index', [
            'applications' => $applications,
            'counts' => $counts,
            'filters' => ['status' => $status],
        ]);
    }

    public function update(UpdateApplicationStatusRequest $request, Application $application): RedirectResponse
    {
        $updated = $this->applicationService->updateStatus($application, $request->validated());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Application status updated to '.$updated->status->value.'.',
        ]);

        return back();
    }
}
