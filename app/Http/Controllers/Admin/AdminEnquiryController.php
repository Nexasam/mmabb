<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminEnquiryController extends Controller
{
    public function index(): Response
    {
        $enquiries = Enquiry::latest()->paginate(20);

        $counts = [
            'total' => Enquiry::count(),
            'unread' => Enquiry::where('is_read', false)->count(),
            'read' => Enquiry::where('is_read', true)->count(),
        ];

        return Inertia::render('admin/enquiries/index', [
            'enquiries' => $enquiries,
            'counts' => $counts,
        ]);
    }

    public function markRead(Enquiry $enquiry): RedirectResponse
    {
        $enquiry->update(['is_read' => true]);

        return back();
    }

    public function destroy(Enquiry $enquiry): RedirectResponse
    {
        $enquiry->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Enquiry deleted.']);

        return back();
    }
}
