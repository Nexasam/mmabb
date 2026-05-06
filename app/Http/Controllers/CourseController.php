<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    /**
     * Display the public courses listing page.
     */
    public function index(): Response
    {
        $courses = Course::where('is_active', true)
            ->select(['id', 'title', 'slug', 'description', 'duration', 'location', 'price'])
            ->get();

        return Inertia::render('courses/index', [
            'courses' => $courses,
        ]);
    }

    /**
     * Display a single course detail page.
     */
    public function show(Course $course): Response
    {
        abort_unless($course->is_active, 404);

        return Inertia::render('courses/show', [
            'course' => $course,
        ]);
    }
}
