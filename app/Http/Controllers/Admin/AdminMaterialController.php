<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMaterialRequest;
use App\Models\Course;
use App\Models\Material;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminMaterialController extends Controller
{
    /**
     * Display the materials management page.
     */
    public function index(): Response
    {
        $courses = Course::where('is_active', true)
            ->with(['materials' => fn ($q) => $q->orderBy('sort_order')])
            ->get(['id', 'title']);

        return Inertia::render('admin/materials/index', [
            'courses' => $courses,
        ]);
    }

    /**
     * Store a newly uploaded material.
     */
    public function store(StoreMaterialRequest $request): RedirectResponse
    {
        $file = $request->file('file');
        $path = $file->store('materials', 'private');

        Material::create([
            'course_id' => $request->course_id,
            'title' => $request->title,
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'file_size' => $file->getSize(),
            'sort_order' => $request->sort_order ?? 0,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Material uploaded successfully.']);

        return back();
    }

    /**
     * Delete a material.
     */
    public function destroy(Material $material): RedirectResponse
    {
        Storage::disk('private')->delete($material->file_path);
        $material->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Material deleted.']);

        return back();
    }
}
