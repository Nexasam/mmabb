import { Head, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Users2 } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import type { Application, ApplicationStatus } from '@/types';

type PaginatedApplications = {
    data: Application[];
    current_page: number;
    last_page: number;
    total: number;
};
type Counts = { total: number; pending: number; approved: number; rejected: number };
type Props = { applications: PaginatedApplications; counts: Counts; filters: { status: string | null } };

const statusStyles: Record<ApplicationStatus, { pill: string; dot: string; label: string }> = {
    pending:  { pill: 'bg-amber-50 text-amber-700 border border-amber-200', dot: 'bg-amber-400', label: 'Pending'  },
    approved: { pill: 'bg-green-50 text-green-700 border border-green-200', dot: 'bg-green-500', label: 'Approved' },
    rejected: { pill: 'bg-red-50 text-red-700 border border-red-200',       dot: 'bg-red-500',   label: 'Rejected' },
};

type DialogState = { open: boolean; application: Application | null; status: ApplicationStatus; adminNotes: string };

export default function AdminApplicationsIndex({ applications, counts, filters }: Props) {
    const [dialog, setDialog] = useState<DialogState>({ open: false, application: null, status: 'pending', adminNotes: '' });
    const [processing, setProcessing] = useState(false);

    function openDialog(app: Application) {
        setDialog({ open: true, application: app, status: app.status, adminNotes: app.admin_notes ?? '' });
    }
    function closeDialog() { setDialog((p) => ({ ...p, open: false })); }

    function handleUpdate() {
        if (!dialog.application) return;
        setProcessing(true);
        router.patch(`/admin/applications/${dialog.application.id}`, { status: dialog.status, admin_notes: dialog.adminNotes }, {
            preserveScroll: true,
            onFinish: () => { setProcessing(false); closeDialog(); },
        });
    }

    function filterByStatus(status: string | null) {
        router.get('/admin/applications', status ? { status } : {}, { preserveState: true, replace: true });
    }

    const tabs = [
        { label: 'All',      value: null,       count: counts.total,    color: 'text-gray-900'   },
        { label: 'Pending',  value: 'pending',  count: counts.pending,  color: 'text-amber-700'  },
        { label: 'Approved', value: 'approved', count: counts.approved, color: 'text-green-700'  },
        { label: 'Rejected', value: 'rejected', count: counts.rejected, color: 'text-red-700'    },
    ];

    const isActive = (v: string | null) =>
        filters.status === v || (v === null && !filters.status);

    return (
        <>
            <Head title="Applications — Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600">
                        <Users2 className="size-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            Applications
                        </h1>
                        <p className="text-sm text-gray-500">Review and manage course applications</p>
                    </div>
                </div>

                {/* Stat tabs */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.label}
                            onClick={() => filterByStatus(tab.value)}
                            className={`rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${
                                isActive(tab.value)
                                    ? 'border-brand-300 bg-brand-50 shadow-sm'
                                    : 'border-gray-100 bg-white shadow-sm'
                            }`}
                        >
                            <div className={`text-2xl font-extrabold ${isActive(tab.value) ? 'text-brand-700' : tab.color}`}>
                                {tab.count}
                            </div>
                            <div className="text-xs font-medium text-gray-500">{tab.label}</div>
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-50 px-6 py-4">
                        <h2 className="font-bold text-gray-900">
                            {filters.status
                                ? `${filters.status.charAt(0).toUpperCase() + filters.status.slice(1)} Applications`
                                : 'All Applications'}
                        </h2>
                    </div>

                    {applications.data.length === 0 ? (
                        <div className="py-16 text-center text-sm text-gray-400">No applications found.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-50 bg-gray-50/80 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        <th className="px-5 py-3">Applicant</th>
                                        <th className="px-5 py-3">Course</th>
                                        <th className="hidden px-5 py-3 sm:table-cell">Phone</th>
                                        <th className="hidden px-5 py-3 md:table-cell">Date</th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {applications.data.map((app) => {
                                        const s = statusStyles[app.status];
                                        return (
                                            <tr key={app.id} className="transition-colors hover:bg-gray-50/60">
                                                <td className="px-5 py-3.5">
                                                    <div className="font-semibold text-gray-900">{app.full_name}</div>
                                                    <div className="text-xs text-gray-400">{app.email}</div>
                                                </td>
                                                <td className="px-5 py-3.5 text-gray-600">
                                                    {app.course?.title ?? '—'}
                                                </td>
                                                <td className="hidden px-5 py-3.5 text-gray-500 sm:table-cell">
                                                    {app.phone}
                                                </td>
                                                <td className="hidden px-5 py-3.5 text-gray-400 md:table-cell">
                                                    {new Date(app.created_at).toLocaleDateString('en-GB')}
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${s.pill}`}>
                                                        <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                                                        {s.label}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3.5 text-right">
                                                    <button
                                                        onClick={() => openDialog(app)}
                                                        className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"
                                                    >
                                                        Update
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {applications.last_page > 1 && (
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Page {applications.current_page} of {applications.last_page} ({applications.total} total)</span>
                        <div className="flex gap-2">
                            {applications.current_page > 1 && (
                                <button
                                    onClick={() => router.get('/admin/applications', { page: applications.current_page - 1, ...(filters.status ? { status: filters.status } : {}) }, { preserveState: true })}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50"
                                >
                                    <ChevronLeft className="size-4" />
                                </button>
                            )}
                            {applications.current_page < applications.last_page && (
                                <button
                                    onClick={() => router.get('/admin/applications', { page: applications.current_page + 1, ...(filters.status ? { status: filters.status } : {}) }, { preserveState: true })}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50"
                                >
                                    <ChevronRight className="size-4" />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Update status dialog ── */}
            <Dialog open={dialog.open} onOpenChange={(open) => !open && closeDialog()}>
                <DialogContent className="overflow-hidden rounded-2xl p-0 shadow-2xl sm:max-w-md">

                    {/* Coloured header */}
                    <div className="bg-gradient-to-br from-brand-700 to-brand-500 px-6 py-5 text-white">
                        <DialogHeader>
                            <DialogTitle
                                className="text-lg font-extrabold text-white"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                Update Application Status
                            </DialogTitle>
                            <p className="mt-0.5 text-sm text-brand-200">
                                Change the status and optionally add a note for the applicant.
                            </p>
                        </DialogHeader>
                    </div>

                    {dialog.application && (
                        <div className="space-y-5 px-6 py-5">

                            {/* Applicant info card */}
                            <div className="flex items-start gap-3 rounded-xl border border-[#dddcf0] bg-[#f4f3fb] p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                                    {dialog.application.full_name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <div className="font-bold text-[#1c1b4a]">{dialog.application.full_name}</div>
                                    <div className="truncate text-sm font-medium text-[#5a5980]">{dialog.application.email}</div>
                                    <div className="mt-1 text-xs font-medium text-[#5a5980] leading-snug">{dialog.application.course?.title}</div>
                                </div>
                            </div>

                            {/* Status select */}
                            <div className="grid gap-1.5">
                                <Label className="text-sm font-semibold text-gray-700">
                                    New Status
                                </Label>
                                <Select
                                    value={dialog.status}
                                    onValueChange={(v) => setDialog((p) => ({ ...p, status: v as ApplicationStatus }))}
                                >
                                    <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:border-brand-500 focus:ring-brand-500/20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="pending">
                                            <span className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-amber-400" />
                                                Pending
                                            </span>
                                        </SelectItem>
                                        <SelectItem value="approved">
                                            <span className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                                Approved
                                            </span>
                                        </SelectItem>
                                        <SelectItem value="rejected">
                                            <span className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-red-500" />
                                                Rejected
                                            </span>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Notes */}
                            <div className="grid gap-1.5">
                                <Label htmlFor="admin_notes" className="text-sm font-semibold text-gray-700">
                                    Notes <span className="font-normal text-gray-400">(optional)</span>
                                </Label>
                                <textarea
                                    id="admin_notes"
                                    rows={3}
                                    value={dialog.adminNotes}
                                    onChange={(e) => setDialog((p) => ({ ...p, adminNotes: e.target.value }))}
                                    placeholder="Add a note visible to the applicant…"
                                    className="flex w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
                                />
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-2 border-t border-gray-100 bg-gray-50/60 px-6 py-4">
                        <button
                            onClick={closeDialog}
                            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdate}
                            disabled={processing}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-300/30 transition-all hover:from-brand-700 hover:to-brand-600 disabled:opacity-60 active:scale-95"
                        >
                            {processing && <Spinner className="size-3.5" />}
                            Save Changes
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

AdminApplicationsIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/applications' },
        { title: 'Applications', href: '/admin/applications' },
    ],
};
