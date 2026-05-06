<?php

namespace App\Policies;

use App\Models\Material;
use App\Models\User;

class MaterialPolicy
{
    /**
     * Determine if the user can download the material.
     * Only approved applicants for the course may access materials.
     */
    public function download(User $user, Material $material): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $user->applications()
            ->where('course_id', $material->course_id)
            ->where('status', 'approved')
            ->exists();
    }
}
