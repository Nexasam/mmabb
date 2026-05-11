<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Assessment;
use App\Models\AssessmentSubmission;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminAssessmentController extends Controller
{
    /**
     * List all assessments grouped by course.
     */
    public function index(): Response
    {
        $courses = Course::where('is_active', true)
            ->with(['assessments' => fn ($q) => $q->withCount('submissions')])
            ->get(['id', 'title']);

        return Inertia::render('admin/assessments/index', [
            'courses' => $courses,
        ]);
    }

    /**
     * Store a new assessment.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'course_id' => ['required', 'integer', 'exists:courses,id'],
            'title' => ['required', 'string', 'max:255'],
            'instructions' => ['nullable', 'string', 'max:2000'],
            'time_limit_minutes' => ['required', 'integer', 'min:5', 'max:480'],
            'questions' => ['required', 'array', 'min:1'],
            'questions.*.question' => ['required', 'string', 'max:1000'],
            'questions.*.marks' => ['required', 'integer', 'min:1', 'max:100'],
        ]);

        Assessment::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Assessment created successfully.']);

        return back();
    }

    /**
     * Update an existing assessment.
     */
    public function update(Request $request, Assessment $assessment): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'instructions' => ['nullable', 'string', 'max:2000'],
            'time_limit_minutes' => ['required', 'integer', 'min:5', 'max:480'],
            'questions' => ['required', 'array', 'min:1'],
            'questions.*.question' => ['required', 'string', 'max:1000'],
            'questions.*.marks' => ['required', 'integer', 'min:1', 'max:100'],
            'is_active' => ['boolean'],
        ]);

        $assessment->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Assessment updated.']);

        return back();
    }

    /**
     * Delete an assessment.
     */
    public function destroy(Assessment $assessment): RedirectResponse
    {
        $assessment->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Assessment deleted.']);

        return back();
    }

    /**
     * List all submissions for an assessment.
     */
    public function submissions(Assessment $assessment): Response
    {
        $submissions = $assessment->submissions()
            ->with('user:id,name,email')
            ->latest('submitted_at')
            ->get();

        return Inertia::render('admin/assessments/submissions', [
            'assessment' => $assessment->load('course:id,title'),
            'submissions' => $submissions,
        ]);
    }

    /**
     * Mark a submission and award a score.
     */
    public function mark(Request $request, AssessmentSubmission $submission): RedirectResponse
    {
        $data = $request->validate([
            'score' => ['required', 'integer', 'min:0', 'max:100'],
            'marker_notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $submission->update([
            'score' => $data['score'],
            'marker_notes' => $data['marker_notes'] ?? null,
            'marked_at' => now(),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Submission marked successfully.']);

        return back();
    }
}
