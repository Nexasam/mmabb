<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminPageContentController extends Controller
{
    public function index(): Response
    {
        $items = PageContent::orderBy('page')->orderBy('key')->get();

        // Group by page for the UI
        $grouped = $items->groupBy('page')->map(fn ($group) => $group->values())->all();

        return Inertia::render('admin/page-content/index', [
            'grouped' => $grouped,
        ]);
    }

    public function update(Request $request, PageContent $pageContent): RedirectResponse
    {
        $request->validate([
            'value' => ['nullable', 'string'],
        ]);

        $pageContent->update(['value' => $request->value]);

        Inertia::flash('toast', ['type' => 'success', 'message' => "'{$pageContent->label}' updated."]);

        return back();
    }

    public function bulkUpdate(Request $request): RedirectResponse
    {
        $request->validate([
            'items' => ['required', 'array'],
            'items.*.id' => ['required', 'integer', 'exists:page_contents,id'],
            'items.*.value' => ['nullable', 'string'],
        ]);

        foreach ($request->items as $item) {
            PageContent::where('id', $item['id'])->update(['value' => $item['value'] ?? '']);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Page content saved.']);

        return back();
    }
}
