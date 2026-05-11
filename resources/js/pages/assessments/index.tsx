import { Head, Link } from '@inertiajs/react';
import { ClipboardCheck, Clock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

type AssessmentItem = {
    id: number;
    title: string;
    time_limit_minutes: number;
    question_count: number;
    course: { id: number; title: string };
    submission: {
        submitted_at: string | null;
        score: number | null;
        marked_at: string | null;
    } | null;
};

function StatusBadge({ submission }: { submission: AssessmentItem['submission'] }) {
    if (!submission) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                Not started
            </span>
        );
    }
    if (!submission.submitted_at) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                In progress
            </span>
        );
    }
    if (!submission.marked_at) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                <AlertCircle className="size-3" />
                Awaiting mark
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
            <CheckCircle2 className="size-3" />
            {submission.score}%
        </span>
    );
}

export default function AssessmentsIndex({ assessments }: { assessments: AssessmentItem[] }) {
    return (
        <>
            <Head title="My Assessments" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        My Assessments
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Complete assessments for your approved courses
                    </p>
                </div>

                {assessments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
                            <ClipboardCheck className="size-8 text-brand-400" />
                        </div>
                        <h3 className="mb-1 font-bold text-gray-700">No assessments available</h3>
                        <p className="text-sm text-gray-400">
                            Assessments become available once your application is approved.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {assessments.map((assessment) => {
                            const isSubmitted = !!assessment.submission?.submitted_at;
                            return (
                                <div
                                    key={assessment.id}
                                    className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <div className="flex-1 p-5">
                                        <div className="mb-3 flex items-start justify-between gap-2">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                                                <ClipboardCheck className="size-5 text-brand-600" />
                                            </div>
                                            <StatusBadge submission={assessment.submission} />
                                        </div>
                                        <h3 className="mb-1 font-bold text-gray-900">{assessment.title}</h3>
                                        <p className="mb-3 text-xs text-gray-500">{assessment.course.title}</p>
                                        <div className="flex items-center gap-3 text-xs text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Clock className="size-3.5" />
                                                {assessment.time_limit_minutes} min
                                            </span>
                                            <span>{assessment.question_count} question{assessment.question_count !== 1 ? 's' : ''}</span>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-50 px-5 py-3">
                                        <Link
                                            href={`/assessments/${assessment.id}`}
                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                                        >
                                            {isSubmitted ? 'View Result' : 'Start Assessment'}
                                            <ArrowRight className="size-3.5" />
                                        </Link>
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

AssessmentsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Assessments', href: '/my-assessments' },
    ],
};
