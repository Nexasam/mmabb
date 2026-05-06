<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMaterialRequest;
use App\Models\Material;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MaterialController extends Controller
{
    /**
     * Store a newly uploaded material (admin only).
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
     * Stream a protected PDF to an authorised user for inline viewing.
     */
    public function stream(Material $material): StreamedResponse
    {
        Gate::authorize('download', $material);

        abort_unless(Storage::disk('private')->exists($material->file_path), 404);

        return Storage::disk('private')->response(
            $material->file_path,
            $material->file_name,
            ['Content-Type' => 'application/pdf', 'Content-Disposition' => 'inline'],
        );
    }

    /**
     * Stream a protected PDF to an authorised user.
     */
    public function download(Material $material): StreamedResponse
    {
        Gate::authorize('download', $material);

        abort_unless(Storage::disk('private')->exists($material->file_path), 404);

        return Storage::disk('private')->download(
            $material->file_path,
            $material->file_name,
            ['Content-Type' => 'application/pdf'],
        );
    }

    /**
     * Delete a material (admin only).
     */
    public function destroy(Material $material): RedirectResponse
    {
        Gate::authorize('download', $material); // admins pass this check

        Storage::disk('private')->delete($material->file_path);
        $material->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Material deleted.']);

        return back();
    }
}
