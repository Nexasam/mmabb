<?php

namespace App\Services;

use App\Enums\ApplicationStatus;
use App\Models\Assessment;
use App\Models\AssessmentSubmission;
use App\Models\User;
use Illuminate\Support\Collection;

class AssessmentService
{
    /**
     * Get all active assessments available to a user (approved courses only),
     * with their submission state.
     *
     * @return Collection<int, array<string, mixed>>
     */
    public function getAvailableForUser(User $user): Collection
    {
        $approvedCourseIds = $user->applications()
            ->where('status', ApplicationStatus::Approved->value)
            ->pluck('course_id');

        return Assessment::whereIn('course_id', $approvedCourseIds)
            ->where('is_active', true)
            ->with('course:id,title')
            ->get()
            ->map(fn (Assessment $assessment) => $this->formatForListing($assessment, $user));
    }

    /**
     * Format a single assessment for the listing view.
     *
     * @return array<string, mixed>
     */
    public function formatForListing(Assessment $assessment, User $user): array
    {
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
    }

    /**
     * Check whether a user has approved access to an assessment's course.
     */
    public function userHasAccess(Assessment $assessment, User $user): bool
    {
        return $user->applications()
            ->where('course_id', $assessment->course_id)
            ->where('status', ApplicationStatus::Approved->value)
            ->exists();
    }

    /**
     * Get or create a submission for a user, recording started_at on first access.
     */
    public function getOrCreateSubmission(Assessment $assessment, User $user): AssessmentSubmission
    {
        return AssessmentSubmission::firstOrCreate(
            ['assessment_id' => $assessment->id, 'user_id' => $user->id],
            ['answers' => [], 'started_at' => now()],
        );
    }

    /**
     * Calculate remaining seconds for a submission.
     */
    public function remainingSeconds(Assessment $assessment, AssessmentSubmission $submission): int
    {
        $elapsed = now()->diffInSeconds($submission->started_at);
        $total = $assessment->time_limit_minutes * 60;

        return max(0, $total - $elapsed);
    }

    /**
     * Submit answers, auto-marking MCQ questions and calculating score if all MCQ.
     *
     * @param  array<int, array{question_index: int, answer: string|null}>  $answers
     */
    public function submit(Assessment $assessment, AssessmentSubmission $submission, array $answers): void
    {
        $questionMarks = [];
        $hasTextQuestion = false;

        foreach ($assessment->questions as $i => $question) {
            $type = $question['type'] ?? 'text';

            if ($type === 'mcq') {
                $studentAnswer = collect($answers)->firstWhere('question_index', $i);
                $studentChoice = $studentAnswer['answer'] ?? null;
                $correctIndex = $question['correct_index'] ?? null;
                $awarded = ($studentChoice !== null && (int) $studentChoice === (int) $correctIndex)
                    ? $question['marks']
                    : 0;
                $questionMarks[] = ['question_index' => $i, 'awarded' => $awarded];
            } else {
                $hasTextQuestion = true;
            }
        }

        $score = null;
        $markedAt = null;

        if (! $hasTextQuestion && count($questionMarks) > 0) {
            $totalPossible = collect($assessment->questions)->sum('marks');
            $totalAwarded = collect($questionMarks)->sum('awarded');
            $score = $totalPossible > 0 ? (int) round(($totalAwarded / $totalPossible) * 100) : 0;
            $markedAt = now();
        }

        $submission->update([
            'answers' => $answers,
            'question_marks' => count($questionMarks) > 0 ? $questionMarks : null,
            'submitted_at' => now(),
            'score' => $score,
            'marked_at' => $markedAt,
        ]);
    }

    /**
     * Mark a submission with per-question awarded marks, auto-calculating the final score.
     *
     * @param  array<int, array{question_index: int, awarded: float}>  $questionMarks
     */
    public function mark(
        Assessment $assessment,
        AssessmentSubmission $submission,
        array $questionMarks,
        ?string $markerNotes
    ): int {
        $totalPossible = 0;
        $totalAwarded = 0;

        foreach ($assessment->questions as $i => $question) {
            $mark = collect($questionMarks)->firstWhere('question_index', $i);
            $awarded = $mark ? (float) $mark['awarded'] : 0;
            $maxMarks = $question['marks'];
            $isOptional = $question['optional'] ?? false;

            $studentAnswer = collect($submission->answers)->firstWhere('question_index', $i);
            $hasAnswer = $studentAnswer && trim($studentAnswer['answer'] ?? '') !== '';

            if (! $isOptional || $hasAnswer) {
                $totalPossible += $maxMarks;
                $totalAwarded += min($awarded, $maxMarks);
            }
        }

        $score = $totalPossible > 0 ? (int) round(($totalAwarded / $totalPossible) * 100) : 0;

        $submission->update([
            'question_marks' => $questionMarks,
            'score' => $score,
            'marker_notes' => $markerNotes,
            'marked_at' => now(),
        ]);

        return $score;
    }
}
