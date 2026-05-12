<?php

namespace App\Services;

use App\Enums\ApplicationStatus;
use App\Models\Application;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ApplicationService
{
    /**
     * Get paginated applications for the admin panel with optional status filter.
     *
     * @return array{applications: LengthAwarePaginator, counts: array<string, int>}
     */
    public function getPaginatedForAdmin(?string $status, int $perPage = 20): array
    {
        $applications = Application::with(['user:id,name', 'course:id,title'])
            ->when($status, fn ($q) => $q->where('status', $status))
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        $counts = [
            'total' => Application::count(),
            'pending' => Application::where('status', ApplicationStatus::Pending->value)->count(),
            'approved' => Application::where('status', ApplicationStatus::Approved->value)->count(),
            'rejected' => Application::where('status', ApplicationStatus::Rejected->value)->count(),
        ];

        return compact('applications', 'counts');
    }

    /**
     * Create a new application.
     *
     * @param  array<string, mixed>  $data
     */
    public function create(array $data, ?User $user): Application
    {
        return Application::create([
            ...$data,
            'user_id' => $user?->id,
        ]);
    }

    /**
     * Update the status and notes of an application.
     *
     * @param  array<string, mixed>  $data
     */
    public function updateStatus(Application $application, array $data): Application
    {
        $application->update($data);

        return $application->fresh();
    }

    /**
     * Get all applications for a given user.
     *
     * @return Collection<int, Application>
     */
    public function getForUser(User $user): Collection
    {
        return Application::with('course:id,title,slug')
            ->where('user_id', $user->id)
            ->latest()
            ->get();
    }
}
