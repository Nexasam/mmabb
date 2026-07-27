import { Head, router } from '@inertiajs/react';
import { Users, Trash2, Shield, User as UserIcon } from 'lucide-react';

type User = {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
    email_verified_at: string | null;
    created_at: string;
};

type PaginatedUsers = {
    data: User[];
    current_page: number;
    last_page: number;
    total: number;
};

type Counts = { total: number; admin: number; user: number };

type RoleCase = {
    name: string;
    value: string;
};

export default function AdminUsersIndex({
    users,
    counts,
}: {
    users: PaginatedUsers;
    counts: Counts;
}) {

    function handleDelete(user: User) {
        if (!confirm(`Delete user "${user.name}"? This cannot be undone.`)) return;
        router.delete(`/admin/users/${user.id}`, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Users — Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600">
                        <Users className="size-5 text-white" />
                    </div>
                    <div>
                        <h1
                            className="text-2xl font-extrabold text-gray-900"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Users
                        </h1>
                        <p className="text-sm text-gray-500">Manage user accounts and roles</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: 'Total', value: counts.total, color: 'text-gray-900' },
                        { label: 'Admins', value: counts.admin, color: 'text-brand-700' },
                        { label: 'Users', value: counts.user, color: 'text-blue-700' },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                        >
                            <div className={`text-2xl font-extrabold ${stat.color}`}>
                                {stat.value}
                            </div>
                            <div className="text-xs font-medium text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-50 px-6 py-4">
                        <h2 className="font-bold text-gray-900">All Users</h2>
                    </div>

                    {users.data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <Users className="mb-3 size-8 text-gray-200" />
                            <p className="text-sm text-gray-400">No users yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b border-gray-50 bg-gray-50/50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    <tr>
                                        <th className="px-6 py-3">User</th>
                                        <th className="px-6 py-3">Role</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">Joined</th>
                                        <th className="px-6 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {users.data.map((user) => (
                                        <tr key={user.id} className="transition-colors hover:bg-gray-50/50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                                                        {user.role === 'admin' ? (
                                                            <Shield className="size-5" />
                                                        ) : (
                                                            <UserIcon className="size-5" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium ${
                                                        user.role === 'admin'
                                                            ? 'bg-brand-50 text-brand-700'
                                                            : 'bg-blue-50 text-blue-700'
                                                    }`}
                                                >
                                                    {user.role === 'admin' ? 'Admin' : 'User'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.email_verified_at ? (
                                                    <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                                                        Unverified
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(user.created_at).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleDelete(user)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600"
                                                    title="Delete user"
                                                >
                                                    <Trash2 className="size-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {users.last_page > 1 && (
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>
                            Page {users.current_page} of {users.last_page} ({users.total} total)
                        </span>
                        <div className="flex gap-2">
                            {users.current_page > 1 && (
                                <button
                                    onClick={() =>
                                        router.get(
                                            '/admin/users',
                                            { page: users.current_page - 1 },
                                            { preserveState: true }
                                        )
                                    }
                                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                            )}
                            {users.current_page < users.last_page && (
                                <button
                                    onClick={() =>
                                        router.get(
                                            '/admin/users',
                                            { page: users.current_page + 1 },
                                            { preserveState: true }
                                        )
                                    }
                                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

AdminUsersIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/applications' },
        { title: 'Users', href: '/admin/users' },
    ],
};
