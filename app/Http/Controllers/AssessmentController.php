<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\AssessmentSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AssessmentController extends Controller
{
    /**
     * Show the assessment for the authenticated user.
     * Only approved applicants for the course may access it.
     */
    public function show(Assessment $assessment): Response|RedirectResponse
    {
        $user = auth()->user();

        // Must have an approved application for this course
        $hasAccess = $user->applications()
            ->where('course_id', $assessment->course_id)
            ->where('status', 'approved')
            ->exists();

        abort_unless($hasAccess && $assessment->is_active, 403);

        $submission = AssessmentSubmission::firstOrCreate(
            ['assessment_id' => $assessment->id, 'user_id' => $user->id],
            ['answers' => [], 'started_at' => now()],
        );

        // If already submitted, show result page
        if ($submission->isSubmitted()) {
            return Inertia::render('assessments/result', [
                'assessment' => $assessment->only(['id', 'title', 'questions']),
                'submission' => $submission->only(['answers', 'submitted_at', 'score', 'marker_notes', 'marked_at']),
            ]);
        }

        // Calculate remaining seconds
        $elapsed = now()->diffInSeconds($submission->started_at);
        $totalSeconds = $assessment->time_limit_minutes * 60;
        $remainingSeconds = max(0, $totalSeconds - $elapsed);

        // Auto-submit if time has expired
        if ($remainingSeconds === 0) {
            $submission->update(['submitted_at' => now()]);

            return Inertia::render('assessments/result', [
                'assessment' => $assessment->only(['id', 'title', 'questions']),
                'submission' => $submission->fresh()->only(['answers', 'submitted_at', 'score', 'marker_notes', 'marked_at']),
            ]);
        }

        return Inertia::render('assessments/show', [
            'assessment' => $assessment->only(['id', 'title', 'instructions', 'questions', 'time_limit_minutes']),
            'submission' => $submission->only(['id', 'answers', 'started_at']),
            'remainingSeconds' => $remainingSeconds,
        ]);
    }

    /**
     * Submit the assessment answers.
     */
    public function submit(Request $request, Assessment $assessment): RedirectResponse
    {
        $user = auth()->user();

        $hasAccess = $user->applications()
            ->where('course_id', $assessment->course_id)
            ->where('status', 'approved')
            ->exists();

        abort_unless($hasAccess && $assessment->is_active, 403);

        $submission = AssessmentSubmission::where('assessment_id', $assessment->id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        abort_if($submission->isSubmitted(), 403, 'Already submitted.');

        $request->validate([
            'answers' => ['required', 'array'],
            'answers.*.question_index' => ['required', 'integer', 'min:0'],
            'answers.*.answer' => ['nullable', 'string', 'max:5000'],
        ]);

        $submission->update([
            'answers' => $request->answers,
            'submitted_at' => now(),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Assessment submitted successfully.']);

        return to_route('assessments.show', $assessment);
    }

    /**
     * List assessments available to the authenticated user.
     */
    public function index(): Response
    {
        $user = auth()->user();

        $approvedCourseIds = $user->applications()
            ->where('status', 'approved')
            ->pluck('course_id');

        $assessments = Assessment::whereIn('course_id', $approvedCourseIds)
            ->where('is_active', true)
            ->with('course:id,title')
            ->get()
            ->map(function (Assessment $assessment) use ($user) {
                $submission = AssessmentSubmission::where('assessment_id', $assessment->id)
                    ->where('user_id', $user->id)
                    ->first();

                return [
                    'id' => $assessment->id,
                    'title' => $assessment->title,
                    'time_limit_minutes' => $assessment->time_limit_minutes,
                    'question_count' => count($assessment->questions),
                    'course' => $assessment->course->only(['id', 'title']),
                    'submission' => $submission ? [
                        'submitted_at' => $submission->submitted_at,
                        'score' => $submission->score,
                        'marked_at' => $submission->marked_at,
                    ] : null,
                ];
            });

        return Inertia::render('assessments/index', [
            'assessments' => $assessments,
        ]);
    }
}
