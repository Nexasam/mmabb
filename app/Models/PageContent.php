<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageContent extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'page',
        'key',
        'label',
        'type',
        'value',
    ];
    /**
     * Get a single content value by key, with an optional fallback.
     */
    public static function get(string $key, string $fallback = ''): string
    {
        return static::where('key', $key)->value('value') ?? $fallback;
    }

    /**
     * Get all content for a page as a key => value map.
     *
     * @return array<string, string>
     */
    public static function forPage(string $page): array
    {
        return static::where('page', $page)
            ->pluck('value', 'key')
            ->all();
    }

    /**
     * Decode a JSON content field, returning the fallback on failure.
     *
     * @param  array<mixed>  $fallback
     * @return array<mixed>
     */
    public static function json(string $key, array $fallback = []): array
    {
        $raw = static::where('key', $key)->value('value');

        if ($raw === null) {
            return $fallback;
        }

        $decoded = json_decode($raw, true);

        return is_array($decoded) ? $decoded : $fallback;
    }
}
