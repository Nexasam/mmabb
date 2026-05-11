import { Head, router } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Question = { question: string; marks: number };
type Assessment = {
    id: number;
    title: string;
    questions: Question[];
    time_limit_minutes: number;
    course: { id: number; title: string };
};
type Submission = {
    id: number;
    user: { id: number; name: string; email: string };
    answers: { question_index: number; answer: string }[];
    submitted_at: string | null;
    score: number | null;
    marker_notes: string | null;
    marked_at: string | null;
};

type MarkDialog = { open: boolean; submission: Submission | null; score: string; notes: string };

export default function AdminAssessmentSubmissions({
    assessment,
    submissions,
}: {
    assessment: Assessment;
    submissions: Submission[];
}) {
    const [markDialog, setMarkDialog] = useState<MarkDialog>({
        open: false, submission: null, score: '', notes: '',
    });
    const [processing, setProcessing] = useState(false);
    const [viewSubmission, setViewSubmission] = useState<Submission | null>(null);

    function openMark(sub: Submission) {
        setMarkDialog({ open: true, submission: sub, score: String(sub.score ?? ''), notes: sub.marker_notes ?? '' });
    }

    function handleMark() {
        if (!markDialog.submission) return;
        setProcessing(true);
        router.patch(
            `/admin/submissions/${markDialog.submission.id}/mark`,
            { score: parseInt(markDialog.score), marker_notes: markDialog.notes },
            {
                preserveScroll: true,
                onFinish: () => { setProcessing(false); setMarkDialog((p) => ({ ...p, open: false })); },
            },
        );
    }

    const totalMarks = assessment.questions.reduce((s, q) => s + q.marks, 0);
    const submitted = submissions.filter((s) => s.submitted_at);
    const marked = submissions.filter((s) => s.marked_at);

    return (
        <>
            <Head title={`Submissions — ${assessment.title}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex items-start gap-3">
                    <a
                        href="/admin/assessments"
                        className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                        <ArrowLeft className="size-4" />
                    </a>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{assessment.course.title}</p>
                        <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            {assessment.title}
                        </h1>
                        <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                            <span>{assessment.questions.length} questions · {totalMarks} total marks · {assessment.time_limit_minutes} min</span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: 'Submissions', value: submitted.length, color: 'text-gray-900' },
                        { label: 'Marked', value: marked.length, color: 'text-green-700' },
                        { label: 'Pending Mark', value: submitted.length - marked.length, color: 'text-amber-700' },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                            <div className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</div>
                            <div className="text-xs font-medium text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Submissions table */}
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-50 px-6 py-4">
                        <h2 className="font-bold text-gray-900">All Submissions</h2>
                    </div>
                    {submissions.length === 0 ? (
                        <div className="py-16 text-center text-sm text-gray-400">No submissions yet.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-50 bg-gray-50/80 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        <th className="px-5 py-3">Student</th>
                                        <th className="px-5 py-3">Submitted</th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3">Score</th>
                                        <th className="px-5 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {submissions.map((sub) => (
                                        <tr key={sub.id} className="hover:bg-gray-50/60">
                                            <td className="px-5 py-3.5">
                                                <div className="font-semibold text-gray-900">{sub.user.name}</div>
                                                <div className="text-xs text-gray-400">{sub.user.email}</div>
                                            </td>
                                            <td className="px-5 py-3.5 text-gray-500">
                                                {sub.submitted_at
                                                    ? new Date(sub.submitted_at).toLocaleDateString('en-GB')
                                                    : <span className="text-gray-300">—</span>}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                {!sub.submitted_at ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-500">
                                                        In progress
                                                    </span>
                                                ) : sub.marked_at ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                                        <CheckCircle2 className="size-3" /> Marked
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                                                        <AlertCircle className="size-3" /> Needs marking
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                {sub.score !== null ? (
                                                    <span className="font-bold text-brand-700">{sub.score}%</span>
                                                ) : (
                                                    <span className="text-gray-300">—</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-3.5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {sub.submitted_at && (
                                                        <button
                                                            onClick={() => setViewSubmission(sub)}
                                                            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                                                        >
                                                            View
                                                        </button>
                                                    )}
                                                    {sub.submitted_at && (
                                                        <button
                                                            onClick={() => openMark(sub)}
                                                            className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100"
                                                        >
                                                            {sub.marked_at ? 'Re-mark' : 'Mark'}
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Mark dialog */}
            <Dialog open={markDialog.open} onOpenChange={(o) => !o && setMarkDialog((p) => ({ ...p, open: false }))}>
                <DialogContent className="overflow-hidden rounded-2xl p-0 shadow-2xl sm:max-w-md">
                    <div className="bg-gradient-to-br from-brand-700 to-brand-500 px-6 py-5 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-extrabold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Mark Submission
                            </DialogTitle>
                            <p className="mt-0.5 text-sm text-brand-200">
                                Award a score out of 100% and add optional feedback.
                            </p>
                        </DialogHeader>
                    </div>

                    {markDialog.submission && (
                        <div className="space-y-5 px-6 py-5">
                            <div className="rounded-xl border border-[#dddcf0] bg-[#f4f3fb] p-4">
                                <div className="font-bold text-[#1c1b4a]">{markDialog.submission.user.name}</div>
                                <div className="text-sm text-[#5a5980]">{markDialog.submission.user.email}</div>
                            </div>

                            <div className="grid gap-1.5">
                                <Label className="text-sm font-semibold text-gray-700">
                                    Score <span className="font-normal text-gray-400">(0 – 100%)</span>
                                </Label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={markDialog.score || 0}
                                        onChange={(e) => setMarkDialog((p) => ({ ...p, score: e.target.value }))}
                                        className="flex-1 accent-brand-600"
                                    />
                                    <div className="flex h-10 w-16 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold text-brand-700">
                                        {markDialog.score || 0}%
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-1.5">
                                <Label className="text-sm font-semibold text-gray-700">
                                    Feedback <span className="font-normal text-gray-400">(optional)</span>
                                </Label>
                                <textarea
                                    rows={3}
                                    value={markDialog.notes}
                                    onChange={(e) => setMarkDialog((p) => ({ ...p, notes: e.target.value }))}
                                    placeholder="Add feedback visible to the student…"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-400/20"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-2 border-t border-gray-100 bg-gray-50/60 px-6 py-4">
                        <button
                            onClick={() => setMarkDialog((p) => ({ ...p, open: false }))}
                            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleMark}
                            disabled={processing || !markDialog.score}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-md disabled:opacity-60"
                        >
                            {processing && <Spinner className="size-3.5" />}
                            Save Mark
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* View submission dialog */}
            {viewSubmission && (
                <Dialog open={true} onOpenChange={() => setViewSubmission(null)}>
                    <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl p-0 shadow-2xl sm:max-w-2xl">
                        <div className="bg-gradient-to-br from-brand-700 to-brand-500 px-6 py-5 text-white">
                            <DialogHeader>
                                <DialogTitle className="text-lg font-extrabold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    {viewSubmission.user.name}'s Answers
                                </DialogTitle>
                                <p className="mt-0.5 text-sm text-brand-200">{assessment.title}</p>
                            </DialogHeader>
                        </div>
                        <div className="space-y-4 p-6">
                            {assessment.questions.map((q, i) => {
                                const ans = viewSubmission.answers.find((a) => a.question_index === i);
                                return (
                                    <div key={i} className="overflow-hidden rounded-xl border border-gray-100">
                                        <div className="flex items-start justify-between gap-3 bg-gray-50 px-4 py-3">
                                            <p className="text-sm font-semibold text-gray-900">
                                                <span className="mr-1.5 text-brand-600">Q{i + 1}.</span>{q.question}
                                            </p>
                                            <span className="shrink-0 text-xs font-semibold text-brand-600">{q.marks}m</span>
                                        </div>
                                        <div className="px-4 py-3">
                                            {ans?.answer ? (
                                                <p className="whitespace-pre-wrap text-sm text-gray-700">{ans.answer}</p>
                                            ) : (
                                                <p className="text-sm italic text-gray-400">No answer provided</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}

AdminAssessmentSubmissions.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/applications' },
        { title: 'Assessments', href: '/admin/assessments' },
        { title: 'Submissions', href: '#' },
    ],
};
