import { Head, router } from '@inertiajs/react';
import { MessageSquare, Trash2, MailOpen, Mail } from 'lucide-react';

type Enquiry = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    is_read: boolean;
    created_at: string;
};

type PaginatedEnquiries = {
    data: Enquiry[];
    current_page: number;
    last_page: number;
    total: number;
};

type Counts = { total: number; unread: number; read: number };

export default function AdminEnquiriesIndex({
    enquiries,
    counts,
}: {
    enquiries: PaginatedEnquiries;
    counts: Counts;
}) {
    function handleMarkRead(enquiry: Enquiry) {
        router.patch(`/admin/enquiries/${enquiry.id}/read`, {}, { preserveScroll: true });
    }

    function handleDelete(enquiry: Enquiry) {
        if (!confirm(`Delete enquiry from "${enquiry.name}"? This cannot be undone.`)) return;
        router.delete(`/admin/enquiries/${enquiry.id}`, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Enquiries — Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600">
                        <MessageSquare className="size-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            Enquiries
                        </h1>
                        <p className="text-sm text-gray-500">Contact form submissions from the website</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: 'Total',  value: counts.total,  color: 'text-gray-900'  },
                        { label: 'Unread', value: counts.unread, color: 'text-amber-700' },
                        { label: 'Read',   value: counts.read,   color: 'text-green-700' },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                            <div className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</div>
                            <div className="text-xs font-medium text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-50 px-6 py-4">
                        <h2 className="font-bold text-gray-900">All Enquiries</h2>
                    </div>

                    {enquiries.data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <MessageSquare className="mb-3 size-8 text-gray-200" />
                            <p className="text-sm text-gray-400">No enquiries yet.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {enquiries.data.map((enquiry) => (
                                <div
                                    key={enquiry.id}
                                    className={`px-6 py-4 transition-colors ${enquiry.is_read ? 'bg-white' : 'bg-amber-50/40'}`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="font-semibold text-gray-900">{enquiry.name}</span>
                                                {!enquiry.is_read && (
                                                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                                                        New
                                                    </span>
                                                )}
                                                {enquiry.subject && (
                                                    <span className="text-sm text-gray-500">— {enquiry.subject}</span>
                                                )}
                                            </div>
                                            <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                                                <span>{enquiry.email}</span>
                                                {enquiry.phone && <span>{enquiry.phone}</span>}
                                                <span>{new Date(enquiry.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <p className="mt-2 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap">
                                                {enquiry.message}
                                            </p>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-1.5">
                                            {!enquiry.is_read && (
                                                <button
                                                    onClick={() => handleMarkRead(enquiry)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-brand-500 hover:bg-brand-50"
                                                    title="Mark as read"
                                                >
                                                    <MailOpen className="size-4" />
                                                </button>
                                            )}
                                            {enquiry.is_read && (
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-300" title="Read">
                                                    <Mail className="size-4" />
                                                </div>
                                            )}
                                            <button
                                                onClick={() => handleDelete(enquiry)}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600"
                                                title="Delete"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {enquiries.last_page > 1 && (
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Page {enquiries.current_page} of {enquiries.last_page} ({enquiries.total} total)</span>
                        <div className="flex gap-2">
                            {enquiries.current_page > 1 && (
                                <button
                                    onClick={() => router.get('/admin/enquiries', { page: enquiries.current_page - 1 }, { preserveState: true })}
                                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                            )}
                            {enquiries.current_page < enquiries.last_page && (
                                <button
                                    onClick={() => router.get('/admin/enquiries', { page: enquiries.current_page + 1 }, { preserveState: true })}
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

AdminEnquiriesIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/applications' },
        { title: 'Enquiries', href: '/admin/enquiries' },
    ],
};
