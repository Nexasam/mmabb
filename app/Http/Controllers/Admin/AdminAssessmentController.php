<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Assessment;
use App\Models\AssessmentSubmission;
use App\Models\Course;
use App\Services\AssessmentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminAssessmentController extends Controller
{
    public function __construct(private readonly AssessmentService $assessmentService) {}

    public function index(): Response
    {
        $courses = Course::where('is_active', true)
            ->with(['assessments' => fn ($q) => $q->withCount('submissions')])
            ->get(['id', 'title']);

        return Inertia::render('admin/assessments/index', [
            'courses' => $courses,
        ]);
    }

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
            'questions.*.optional' => ['boolean'],
            'questions.*.type' => ['required', 'string', 'in:text,mcq'],
            'questions.*.options' => ['nullable', 'array', 'min:2'],
            'questions.*.options.*' => ['nullable', 'string', 'max:500'],
            'questions.*.correct_index' => ['nullable', 'integer', 'min:0'],
        ]);

        Assessment::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Assessment created successfully.']);

        return back();
    }

    public function update(Request $request, Assessment $assessment): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'instructions' => ['nullable', 'string', 'max:2000'],
            'time_limit_minutes' => ['required', 'integer', 'min:5', 'max:480'],
            'questions' => ['required', 'array', 'min:1'],
            'questions.*.question' => ['required', 'string', 'max:1000'],
            'questions.*.marks' => ['required', 'integer', 'min:1', 'max:100'],
            'questions.*.optional' => ['boolean'],
            'questions.*.type' => ['required', 'string', 'in:text,mcq'],
            'questions.*.options' => ['nullable', 'array', 'min:2'],
            'questions.*.options.*' => ['nullable', 'string', 'max:500'],
            'questions.*.correct_index' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ]);

        $assessment->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Assessment updated.']);

        return back();
    }

    public function destroy(Assessment $assessment): RedirectResponse
    {
        $assessment->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Assessment deleted.']);

        return back();
    }

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

    public function mark(Request $request, AssessmentSubmission $submission): RedirectResponse
    {
        $data = $request->validate([
            'question_marks' => ['required', 'array'],
            'question_marks.*.question_index' => ['required', 'integer', 'min:0'],
            'question_marks.*.awarded' => ['required', 'numeric', 'min:0'],
            'marker_notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $score = $this->assessmentService->mark(
            $submission->assessment,
            $submission,
            $data['question_marks'],
            $data['marker_notes'] ?? null,
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => "Submission marked: {$score}%."]);

        return back();
    }
}
