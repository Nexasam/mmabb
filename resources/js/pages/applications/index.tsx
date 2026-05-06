import { Head, Link } from '@inertiajs/react';
import { ArrowRight, ClipboardList, FileText } from 'lucide-react';
import type { Application, ApplicationStatus } from '@/types';

const statusStyles: Record<ApplicationStatus, { pill: string; dot: string; label: string }> = {
    pending:  { pill: 'bg-amber-50 text-amber-700 border border-amber-200',   dot: 'bg-amber-400',  label: 'Pending'  },
    approved: { pill: 'bg-green-50 text-green-700 border border-green-200',   dot: 'bg-green-500',  label: 'Approved' },
    rejected: { pill: 'bg-red-50 text-red-700 border border-red-200',         dot: 'bg-red-500',    label: 'Rejected' },
};

export default function ApplicationsIndex({ applications }: { applications: Application[] }) {
    return (
        <>
            <Head title="My Applications" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1
                            className="text-2xl font-extrabold text-gray-900"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            My Applications
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Track the status of your course applications
                        </p>
                    </div>
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100"
                    >
                        Browse Courses
                        <ArrowRight className="size-3.5" />
                    </Link>
                </div>

                {/* Empty state */}
                {applications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
                            <ClipboardList className="size-8 text-brand-400" />
                        </div>
                        <h3 className="mb-1 font-bold text-gray-700">No applications yet</h3>
                        <p className="mb-5 text-sm text-gray-400">
                            You haven't applied for any courses yet.
                        </p>
                        <Link
                            href="/courses"
                            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-brand-700 active:scale-95"
                        >
                            Browse Courses
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {applications.map((application) => {
                            const s = statusStyles[application.status];
                            return (
                                <div
                                    key={application.id}
                                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                                >
                                    {/* Card header */}
                                    <div className="flex items-start justify-between gap-4 border-b border-gray-50 px-6 py-4">
                                        <div>
                                            <h3 className="font-bold text-gray-900">
                                                {application.course?.title ?? 'Course'}
                                            </h3>
                                            <p className="mt-0.5 text-xs text-gray-400">
                                                Applied{' '}
                                                {new Date(application.created_at).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${s.pill}`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                                            {s.label}
                                        </span>
                                    </div>

                                    {/* Card body */}
                                    <div className="px-6 py-4">
                                        <div className="grid gap-1 text-sm sm:grid-cols-2">
                                            <span className="text-gray-500">
                                                <span className="font-medium text-gray-700">Name: </span>
                                                {application.full_name}
                                            </span>
                                            <span className="text-gray-500">
                                                <span className="font-medium text-gray-700">Email: </span>
                                                {application.email}
                                            </span>
                                        </div>

                                        {/* Approved banner */}
                                        {application.status === 'approved' && (
                                            <div className="mt-4 flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50 p-4">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600">
                                                    <FileText className="size-4 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-brand-800">
                                                        Course materials are available
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-brand-600">
                                                        Your application has been approved. Access your materials below.
                                                    </p>
                                                    <Link
                                                        href="/my-materials"
                                                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-800"
                                                    >
                                                        Access Materials <ArrowRight className="size-3" />
                                                    </Link>
                                                </div>
                                            </div>
                                        )}

                                        {/* Rejected feedback */}
                                        {application.status === 'rejected' && application.admin_notes && (
                                            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
                                                <p className="text-xs font-bold text-red-700">Feedback from our team:</p>
                                                <p className="mt-1 text-xs text-red-600">{application.admin_notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

ApplicationsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Applications', href: '/my-applications' },
    ],
};
