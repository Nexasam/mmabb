<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Show the public home page.
     */
    public function home(): Response
    {
        return Inertia::render('home');
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
}
