<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\AssessmentSubmission;
use App\Services\AssessmentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AssessmentController extends Controller
{
    public function __construct(private readonly AssessmentService $assessmentService) {}

    /**
     * List assessments available to the authenticated user.
     */
    public function index(): Response
    {
        $assessments = $this->assessmentService->getAvailableForUser(auth()->user());

        return Inertia::render('assessments/index', [
            'assessments' => $assessments,
        ]);
    }

    /**
     * Show the assessment or result page for the authenticated user.
     */
    public function show(Assessment $assessment): Response|RedirectResponse
    {
        $user = auth()->user();

        abort_unless(
            $this->assessmentService->userHasAccess($assessment, $user) && $assessment->is_active,
            403,
        );

        $submission = $this->assessmentService->getOrCreateSubmission($assessment, $user);

        if ($submission->isSubmitted()) {
            return Inertia::render('assessments/result', [
                'assessment' => $assessment->only(['id', 'title', 'questions']),
                'submission' => $submission->only(['answers', 'submitted_at', 'score', 'marker_notes', 'marked_at']),
            ]);
        }

        $remainingSeconds = $this->assessmentService->remainingSeconds($assessment, $submission);

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

        abort_unless(
            $this->assessmentService->userHasAccess($assessment, $user) && $assessment->is_active,
            403,
        );

        $submission = AssessmentSubmission::where('assessment_id', $assessment->id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        abort_if($submission->isSubmitted(), 403, 'Already submitted.');

        $request->validate([
            'answers' => ['required', 'array'],
            'answers.*.question_index' => ['required', 'integer', 'min:0'],
            'answers.*.answer' => ['nullable', 'string', 'max:5000'],
        ]);

        $this->assessmentService->submit($assessment, $submission, $request->answers);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Assessment submitted successfully.']);

        return to_route('assessments.show', $assessment);
    }
}
