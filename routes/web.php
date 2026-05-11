<?php

use App\Http\Controllers\Admin\AdminApplicationController;
use App\Http\Controllers\Admin\AdminAssessmentController;
use App\Http\Controllers\Admin\AdminMaterialController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\UserMaterialController;
use App\Http\Middleware\EnsureUserIsAdmin;
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

    // Assessments (approved applicants only)
    Route::get('/my-assessments', [AssessmentController::class, 'index'])->name('assessments.index');
    Route::get('/assessments/{assessment}', [AssessmentController::class, 'show'])->name('assessments.show');
    Route::post('/assessments/{assessment}/submit', [AssessmentController::class, 'submit'])->name('assessments.submit');
});

// ─── Admin area ───────────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified', EnsureUserIsAdmin::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/applications', [AdminApplicationController::class, 'index'])->name('applications.index');
        Route::patch('/applications/{application}', [AdminApplicationController::class, 'update'])->name('applications.update');

        Route::get('/materials', [AdminMaterialController::class, 'index'])->name('materials.index');
        Route::post('/materials', [AdminMaterialController::class, 'store'])->name('materials.store');
        Route::delete('/materials/{material}', [AdminMaterialController::class, 'destroy'])->name('materials.destroy');

        // Assessments
        Route::get('/assessments', [AdminAssessmentController::class, 'index'])->name('assessments.index');
        Route::post('/assessments', [AdminAssessmentController::class, 'store'])->name('assessments.store');
        Route::put('/assessments/{assessment}', [AdminAssessmentController::class, 'update'])->name('assessments.update');
        Route::delete('/assessments/{assessment}', [AdminAssessmentController::class, 'destroy'])->name('assessments.destroy');
        Route::get('/assessments/{assessment}/submissions', [AdminAssessmentController::class, 'submissions'])->name('assessments.submissions');
        Route::patch('/submissions/{submission}/mark', [AdminAssessmentController::class, 'mark'])->name('submissions.mark');
    });

require __DIR__.'/settings.php';
