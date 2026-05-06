<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreApplicationRequest;
use App\Models\Application;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ApplicationController extends Controller
{
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
        $data = $request->validated();
        $data['user_id'] = $request->user()?->id;

        Application::create($data);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Your application has been submitted. We will be in touch shortly.',
        ]);

        return to_route('courses.show', Course::find($data['course_id']));
    }

    /**
     * Show the authenticated user's applications.
     */
    public function index(): Response
    {
        $applications = Application::with('course:id,title,slug')
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('applications/index', [
            'applications' => $applications,
        ]);
    }
}
