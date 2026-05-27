<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SurveyLink;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminSurveyLinkController extends Controller
{
    public function index(): Response
    {
        $surveyLinks = SurveyLink::latest()->get();

        return Inertia::render('admin/survey-links/index', [
            'surveyLinks' => $surveyLinks->map(fn (SurveyLink $link) => [
                'id' => $link->id,
                'title' => $link->title,
                'description' => $link->description,
                'url' => $link->url,
                'token' => $link->token,
                'is_active' => $link->is_active,
                'public_url' => $link->publicUrl(),
                'created_at' => $link->created_at,
            ]),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:500'],
            'url' => ['required', 'url', 'max:2048'],
        ]);

        SurveyLink::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Survey link created successfully.']);

        return back();
    }

    public function update(Request $request, SurveyLink $surveyLink): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:500'],
            'url' => ['required', 'url', 'max:2048'],
            'is_active' => ['boolean'],
        ]);

        $surveyLink->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Survey link updated.']);

        return back();
    }

    public function destroy(SurveyLink $surveyLink): RedirectResponse
    {
        $surveyLink->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Survey link deleted.']);

        return back();
    }
}
