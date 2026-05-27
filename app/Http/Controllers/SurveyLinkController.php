<?php

namespace App\Http\Controllers;

use App\Models\SurveyLink;
use Illuminate\Http\RedirectResponse;

class SurveyLinkController extends Controller
{
    /**
     * Redirect to the survey URL associated with the given token.
     */
    public function redirect(string $token): RedirectResponse
    {
        $surveyLink = SurveyLink::where('token', $token)
            ->where('is_active', true)
            ->firstOrFail();

        return redirect()->away($surveyLink->url);
    }
}
