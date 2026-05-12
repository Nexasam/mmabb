import { Head, router } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, AlertCircle, Star } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Question = { question: string; marks: number; optional: boolean };
type Assessment = {
    id: number;
    title: string;
    questions: Question[];
    time_limit_minutes: number;
    course: { id: number; title: string };
};
type QuestionMark = { question_index: number; awarded: number };
type Submission = {
    id: number;
    user: { id: number; name: string; email: string };
    answers: { question_index: number; answer: string }[];
    question_marks: QuestionMark[] | null;
    submitted_at: string | null;
    score: number | null;
    marker_notes: string | null;
    marked_at: string | null;
};

type MarkState = {
    open: boolean;
    submission: Submission | null;
    questionMarks: Record<number, string>; // question_index -> awarded string
    notes: string;
};

function getAnswer(submission: Submission, index: number): string {
    return submission.answers.find((a) => a.question_index === index)?.answer ?? '';
}

function getAwarded(submission: Submission, index: number): number | null {
    return submission.question_marks?.find((m) => m.question_index === index)?.awarded ?? null;
}

export default function AdminAssessmentSubmissions({
    assessment,
    submissions,
}: {
    assessment: Assessment;
    submissions: Submission[];
}) {
    const [markState, setMarkState] = useState<MarkState>({
        open: false, submission: null, questionMarks: {}, notes: '',
    });
    const [processing, setProcessing] = useState(false);
    const [viewSubmission, setViewSubmission] = useState<Submission | null>(null);

    function openMark(sub: Submission) {
        const existing: Record<number, string> = {};
        assessment.questions.forEach((_, i) => {
            const awarded = getAwarded(sub, i);
            existing[i] = awarded !== null ? String(awarded) : '';
        });
        setMarkState({ open: true, submission: sub, questionMarks: existing, notes: sub.marker_notes ?? '' });
    }

    function setQuestionMark(index: number, value: string) {
        setMarkState((p) => ({ ...p, questionMarks: { ...p.questionMarks, [index]: value } }));
    }

    // Calculate live score preview
    function calcScore(sub: Submission, marks: Record<number, string>): { awarded: number; possible: number; pct: number } {
        let awarded = 0;
        let possible = 0;
        assessment.questions.forEach((q, i) => {
            const hasAnswer = getAnswer(sub, i).trim() !== '';
            const isOptional = q.optional ?? false;
            if (!isOptional || hasAnswer) {
                possible += q.marks;
                awarded += Math.min(parseFloat(marks[i] || '0') || 0, q.marks);
            }
        });
        return { awarded, possible, pct: possible > 0 ? Math.round((awarded / possible) * 100) : 0 };
    }

    function handleMark() {
        if (!markState.submission) return;
        setProcessing(true);
        const questionMarks = assessment.questions.map((_, i) => ({
            question_index: i,
            awarded: parseFloat(markState.questionMarks[i] || '0') || 0,
        }));
        router.patch(
            `/admin/submissions/${markState.submission.id}/mark`,
            { question_marks: questionMarks, marker_notes: markState.notes },
            {
                preserveScroll: true,
                onFinish: () => { setProcessing(false); setMarkState((p) => ({ ...p, open: false })); },
            },
        );
    }

    const totalMarks = assessment.questions.reduce((s, q) => s + q.marks, 0);
    const submitted = submissions.filter((s) => s.submitted_at);
    const marked = submissions.filter((s) => s.marked_at);

    const liveScore = markState.submission
        ? calcScore(markState.submission, markState.questionMarks)
        : null;

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
                        <div className="mt-1 text-xs text-gray-500">
                            {assessment.questions.length} questions · {totalMarks} total marks · {assessment.time_limit_minutes} min
                            {assessment.questions.some((q) => q.optional) && (
                                <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-amber-600">
                                    {assessment.questions.filter((q) => q.optional).length} optional
                                </span>
                            )}
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

            {/* ── Per-question mark dialog ── */}
            <Dialog open={markState.open} onOpenChange={(o) => !o && setMarkState((p) => ({ ...p, open: false }))}>
                <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl p-0 shadow-2xl sm:max-w-2xl">
                    <div className="bg-gradient-to-br from-brand-700 to-brand-500 px-6 py-5 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-extrabold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Mark Submission
                            </DialogTitle>
                            <p className="mt-0.5 text-sm text-brand-200">
                                Award marks per question. Score is calculated automatically.
                            </p>
                        </DialogHeader>
                    </div>

                    {markState.submission && (
                        <div className="space-y-5 px-6 py-5">
                            {/* Student info */}
                            <div className="flex items-center justify-between rounded-xl border border-[#dddcf0] bg-[#f4f3fb] px-4 py-3">
                                <div>
                                    <div className="font-bold text-[#1c1b4a]">{markState.submission.user.name}</div>
                                    <div className="text-sm text-[#5a5980]">{markState.submission.user.email}</div>
                                </div>
                                {liveScore && (
                                    <div className="text-right">
                                        <div className="text-2xl font-extrabold text-brand-700">{liveScore.pct}%</div>
                                        <div className="text-xs text-gray-400">{liveScore.awarded}/{liveScore.possible} marks</div>
                                    </div>
                                )}
                            </div>

                            {/* Per-question marking */}
                            <div className="space-y-4">
                                {assessment.questions.map((q, i) => {
                                    const answer = getAnswer(markState.submission!, i);
                                    const hasAnswer = answer.trim() !== '';
                                    const isOptional = q.optional ?? false;
                                    const awarded = parseFloat(markState.questionMarks[i] || '0') || 0;
                                    const pct = q.marks > 0 ? Math.round((awarded / q.marks) * 100) : 0;

                                    return (
                                        <div key={i} className={`overflow-hidden rounded-xl border ${isOptional ? 'border-amber-100' : 'border-gray-100'}`}>
                                            {/* Question header */}
                                            <div className={`flex items-start justify-between gap-3 px-4 py-3 ${isOptional ? 'bg-amber-50/60' : 'bg-gray-50'}`}>
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        <span className="mr-1.5 text-brand-600">Q{i + 1}.</span>
                                                        {q.question}
                                                    </p>
                                                    {isOptional && (
                                                        <span className="mt-1 inline-flex items-center gap-1 text-xs text-amber-600">
                                                            <Star className="size-3" /> Optional
                                                            {!hasAnswer && <span className="text-gray-400">(not answered — excluded from score)</span>}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="shrink-0 text-xs font-semibold text-brand-600">{q.marks} marks</span>
                                            </div>

                                            {/* Student answer */}
                                            <div className="border-b border-gray-50 px-4 py-3">
                                                {hasAnswer ? (
                                                    <p className="whitespace-pre-wrap text-sm text-gray-700">{answer}</p>
                                                ) : (
                                                    <p className="text-sm italic text-gray-400">No answer provided</p>
                                                )}
                                            </div>

                                            {/* Mark input */}
                                            <div className="flex items-center gap-3 bg-white px-4 py-3">
                                                <Label className="shrink-0 text-xs font-semibold text-gray-600">
                                                    Marks awarded:
                                                </Label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max={q.marks}
                                                    step="0.5"
                                                    value={markState.questionMarks[i] ?? ''}
                                                    onChange={(e) => setQuestionMark(i, e.target.value)}
                                                    disabled={isOptional && !hasAnswer}
                                                    placeholder="0"
                                                    className="h-8 w-20 rounded-lg border border-gray-200 bg-gray-50 px-2 text-center text-sm font-semibold text-gray-900 disabled:opacity-40"
                                                />
                                                <span className="text-xs text-gray-400">/ {q.marks}</span>
                                                {hasAnswer && (
                                                    <div className="ml-auto flex items-center gap-1.5">
                                                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
                                                            <div
                                                                className={`h-full rounded-full transition-all ${pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-amber-400' : 'bg-red-400'}`}
                                                                style={{ width: `${pct}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs font-semibold text-gray-500">{pct}%</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Overall feedback */}
                            <div className="grid gap-1.5">
                                <Label className="text-sm font-semibold text-gray-700">
                                    Overall Feedback <span className="font-normal text-gray-400">(optional)</span>
                                </Label>
                                <textarea
                                    rows={3}
                                    value={markState.notes}
                                    onChange={(e) => setMarkState((p) => ({ ...p, notes: e.target.value }))}
                                    placeholder="Add overall feedback visible to the student…"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-400/20"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/60 px-6 py-4">
                        {liveScore && (
                            <div className="text-sm font-semibold text-gray-700">
                                Calculated score: <span className="text-brand-700">{liveScore.pct}%</span>
                                <span className="ml-1 text-xs font-normal text-gray-400">({liveScore.awarded}/{liveScore.possible} marks)</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 ml-auto">
                            <button
                                onClick={() => setMarkState((p) => ({ ...p, open: false }))}
                                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleMark}
                                disabled={processing}
                                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-md disabled:opacity-60"
                            >
                                {processing && <Spinner className="size-3.5" />}
                                Save Marks
                            </button>
                        </div>
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
                                const answer = getAnswer(viewSubmission, i);
                                const awarded = getAwarded(viewSubmission, i);
                                const isOptional = q.optional ?? false;
                                return (
                                    <div key={i} className={`overflow-hidden rounded-xl border ${isOptional ? 'border-amber-100' : 'border-gray-100'}`}>
                                        <div className={`flex items-start justify-between gap-3 px-4 py-3 ${isOptional ? 'bg-amber-50/60' : 'bg-gray-50'}`}>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    <span className="mr-1.5 text-brand-600">Q{i + 1}.</span>{q.question}
                                                </p>
                                                {isOptional && (
                                                    <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-amber-600">
                                                        <Star className="size-3" /> Optional
                                                    </span>
                                                )}
                                            </div>
                                            <div className="shrink-0 text-right">
                                                <span className="text-xs font-semibold text-brand-600">{q.marks}m</span>
                                                {awarded !== null && (
                                                    <div className="text-xs font-bold text-green-600">+{awarded}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="px-4 py-3">
                                            {answer ? (
                                                <p className="whitespace-pre-wrap text-sm text-gray-700">{answer}</p>
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
