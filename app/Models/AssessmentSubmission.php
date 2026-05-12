<?php

namespace App\Models;

use Database\Factories\AssessmentSubmissionFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'assessment_id',
    'user_id',
    'answers',
    'question_marks',
    'submitted_at',
    'started_at',
    'score',
    'marker_notes',
    'marked_at',
])]
class AssessmentSubmission extends Model
{
    /** @use HasFactory<AssessmentSubmissionFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'answers' => 'array',
            'question_marks' => 'array',
            'submitted_at' => 'datetime',
            'started_at' => 'datetime',
            'marked_at' => 'datetime',
        ];
    }

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isSubmitted(): bool
    {
        return $this->submitted_at !== null;
    }

    public function isMarked(): bool
    {
        return $this->marked_at !== null;
    }
}
