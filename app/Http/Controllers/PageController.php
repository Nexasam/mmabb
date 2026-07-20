<?php

namespace App\Http\Controllers;

use App\Models\PageContent;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Show the public home page with CMS content.
     */
    public function home(): Response
    {
        // dd('sdfsdf');
        $content = PageContent::forPage('home');
        $global = PageContent::forPage('global');

        return Inertia::render('home', [
            'cms' => array_merge($global, $content),
        ]);
    }

    /**
     * Show the about page.
     */
    public function about(): Response
    {
        return Inertia::render('about');
    }

    /**
     * Show the contact page.
     */
    public function contact(): Response
    {
        return Inertia::render('contact');
    }

    /**
     * Show the training page.
     */
    public function training(): Response
    {
        return Inertia::render('training');
    }
}
