<?php

use App\Http\Controllers\Admin\AdminApplicationController;
use App\Http\Controllers\Admin\AdminMaterialController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\UserMaterialController;
use Illuminate\Support\Facades\Route;

// ─── Public pages ────────────────────────────────────────────────────────────
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');

// ─── Public courses ───────────────────────────────────────────────────────────
Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
Route::get('/courses/{course:slug}', [CourseController::class, 'show'])->name('courses.show');

// ─── Application form (public submit, auth optional) ─────────────────────────
Route::get('/courses/{course:slug}/apply', [ApplicationController::class, 'create'])->name('applications.create');
Route::post('/applications', [ApplicationController::class, 'store'])->name('applications.store');

// ─── Authenticated user area ──────────────────────────────────────────────────
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // My applications
    Route::get('/my-applications', [ApplicationController::class, 'index'])->name('applications.index');

    // My materials (approved applicants only)
    Route::get('/my-materials', [UserMaterialController::class, 'index'])->name('materials.index');
    Route::get('/materials/{material}/view', [UserMaterialController::class, 'show'])->name('materials.show');
    Route::get('/materials/{material}', [MaterialController::class, 'stream'])->name('materials.stream');
    Route::get('/materials/{material}/download', [MaterialController::class, 'download'])->name('materials.download');
});

// ─── Admin area ───────────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified', \App\Http\Middleware\EnsureUserIsAdmin::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/applications', [AdminApplicationController::class, 'index'])->name('applications.index');
        Route::patch('/applications/{application}', [AdminApplicationController::class, 'update'])->name('applications.update');

        Route::get('/materials', [AdminMaterialController::class, 'index'])->name('materials.index');
        Route::post('/materials', [AdminMaterialController::class, 'store'])->name('materials.store');
        Route::delete('/materials/{material}', [AdminMaterialController::class, 'destroy'])->name('materials.destroy');
    });

require __DIR__.'/settings.php';
