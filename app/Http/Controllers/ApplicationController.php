<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreApplicationRequest;
use App\Models\Course;
use App\Services\ApplicationService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ApplicationController extends Controller
{
    public function __construct(private readonly ApplicationService $applicationService) {}

    /**
     * Show the application form for a course.
     */
    public function create(Course $course): Response
    {
        abort_unless($course->is_active, 404);

        return Inertia::render('applications/create', [
            'course' => $course->only(['id', 'title', 'slug']),
        ]);
    }

    /**
     * Store a new application.
     */
    public function store(StoreApplicationRequest $request): RedirectResponse
    {
        $application = $this->applicationService->create(
            $request->validated(),
            $request->user(),
        );

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Your application has been submitted. We will be in touch shortly.',
        ]);

        return to_route('courses.show', Course::find($application->course_id));
    }

    /**
     * Show the authenticated user's applications.
     */
    public function index(): Response
    {
        $applications = $this->applicationService->getForUser(auth()->user());

        return Inertia::render('applications/index', [
            'applications' => $applications,
        ]);
    }
}
