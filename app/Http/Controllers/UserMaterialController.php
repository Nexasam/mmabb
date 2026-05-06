<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Material;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class UserMaterialController extends Controller
{
    /**
     * Show materials available to the authenticated user (approved applications only).
     */
    public function index(): Response
    {
        $user = auth()->user();

        $approvedCourseIds = $user->applications()
            ->where('status', 'approved')
            ->pluck('course_id');

        $courses = Course::whereIn('id', $approvedCourseIds)
            ->with(['materials' => fn ($q) => $q->orderBy('sort_order')])
            ->get(['id', 'title', 'slug']);

        return Inertia::render('materials/index', [
            'courses' => $courses,
        ]);
    }

    /**
     * Show the material viewer page.
     */
    public function show(Material $material): Response
    {
        Gate::authorize('download', $material);

        return Inertia::render('materials/show', [
            'material' => $material->only(['id', 'title', 'file_name']),
        ]);
    }
}
