<?php

namespace App\Models;

use Database\Factories\SurveyLinkFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

#[Fillable([
    'title',
    'description',
    'url',
    'token',
    'is_active',
])]
class SurveyLink extends Model
{
    /** @use HasFactory<SurveyLinkFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (SurveyLink $surveyLink): void {
            if (empty($surveyLink->token)) {
                $surveyLink->token = Str::random(12);
            }
        });
    }

    public function publicUrl(): string
    {
        return route('survey.redirect', $this->token);
    }
}
