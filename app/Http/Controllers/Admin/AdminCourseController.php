<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AdminCourseController extends Controller
{
    public function index(): Response
    {
        $courses = Course::withCount(['applications', 'assessments', 'materials'])
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('admin/courses/index', [
            'courses' => $courses,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateCourse($request);

        $data['slug'] = $this->uniqueSlug($data['title']);

        Course::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Course created successfully.']);

        return back();
    }

    public function update(Request $request, Course $course): RedirectResponse
    {
        $data = $this->validateCourse($request, $course);

        $course->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Course updated successfully.']);

        return back();
    }

    public function destroy(Course $course): RedirectResponse
    {
        $course->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Course deleted.']);

        return back();
    }

    /**
     * @return array<string, mixed>
     */
    private function validateCourse(Request $request, ?Course $course = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255', Rule::unique('courses', 'title')->ignore($course?->id)],
            'description' => ['required', 'string', 'max:1000'],
            'overview' => ['nullable', 'string', 'max:3000'],
            'accreditation' => ['nullable', 'string', 'max:255'],
            'duration' => ['nullable', 'string', 'max:100'],
            'location' => ['nullable', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'is_active' => ['boolean'],
            'learning_objectives' => ['nullable', 'array'],
            'learning_objectives.*' => ['string', 'max:500'],
            'curriculum' => ['nullable', 'array'],
            'curriculum.*.day' => ['required', 'string', 'max:50'],
            'curriculum.*.title' => ['required', 'string', 'max:255'],
            'curriculum.*.topics' => ['required', 'array', 'min:1'],
            'curriculum.*.topics.*' => ['string', 'max:500'],
        ]);
    }

    private function uniqueSlug(string $title): string
    {
        $base = Str::slug($title);
        $slug = $base;
        $i = 2;

        while (Course::where('slug', $slug)->exists()) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }
}
