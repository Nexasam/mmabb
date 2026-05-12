import { Head, router } from '@inertiajs/react';
import { AlertTriangle, Clock, Send, Star } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type QuestionType = 'text' | 'mcq';

type Question = {
    question: string;
    marks: number;
    optional: boolean;
    type: QuestionType;
    options?: string[];
    correct_index?: number | null;
};

type Assessment = {
    id: number;
    title: string;
    instructions: string | null;
    questions: Question[];
    time_limit_minutes: number;
};

type Submission = {
    id: number;
    answers: { question_index: number; answer: string }[];
    started_at: string;
};

function formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function AssessmentShow({
    assessment,
    submission,
    remainingSeconds: initialRemaining,
}: {
    assessment: Assessment;
    submission: Submission;
    remainingSeconds: number;
}) {
    const [answers, setAnswers] = useState<Record<number, string>>(() => {
        const map: Record<number, string> = {};
        submission.answers.forEach((a) => { map[a.question_index] = a.answer; });
        return map;
    });
    const [remaining, setRemaining] = useState(initialRemaining);
    const [submitting, setSubmitting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const autoSubmitted = useRef(false);

    const doSubmit = useCallback(() => {
        if (submitting || autoSubmitted.current) return;
        autoSubmitted.current = true;
        setSubmitting(true);
        const payload = assessment.questions.map((_, i) => ({
            question_index: i,
            answer: answers[i] ?? '',
        }));
        router.post(`/assessments/${assessment.id}/submit`, { answers: payload });
    }, [answers, assessment.id, assessment.questions, submitting]);

    useEffect(() => {
        if (remaining <= 0) { doSubmit(); return; }
        const id = setInterval(() => {
            setRemaining((r) => {
                if (r <= 1) { clearInterval(id); doSubmit(); return 0; }
                return r - 1;
            });
        }, 1000);
        return () => clearInterval(id);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const totalMarks = assessment.questions.reduce((s, q) => s + q.marks, 0);
    const isLowTime = remaining <= 300;

    // Count answered: text = non-empty string, MCQ = any selection
    const answeredCount = assessment.questions.filter((q, i) => {
        const a = answers[i];
        return a !== undefined && a !== '';
    }).length;

    return (
        <>
            <Head title={assessment.title} />

            {/* Sticky timer bar */}
            <div className={`sticky top-0 z-10 flex items-center justify-between border-b px-4 py-2.5 md:px-6 ${isLowTime ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-white'}`}>
                <div>
                    <h1 className="text-sm font-bold text-gray-900">{assessment.title}</h1>
                    <p className="text-xs text-gray-500">{answeredCount}/{assessment.questions.length} answered</p>
                </div>
                <div className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold tabular-nums ${isLowTime ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                    <Clock className="size-4" />
                    {formatTime(remaining)}
                </div>
            </div>

            <div className="mx-auto max-w-3xl space-y-6 p-4 pb-24 md:p-6">
                {/* Instructions */}
                {assessment.instructions && (
                    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
                        <p className="font-semibold">Instructions</p>
                        <p className="mt-1 leading-relaxed">{assessment.instructions}</p>
                    </div>
                )}

                <p className="text-xs text-gray-400">Total marks: {totalMarks}</p>

                {/* Questions */}
                {assessment.questions.map((q, i) => (
                    <div key={i} className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${q.optional ? 'border-amber-100' : 'border-gray-100'}`}>
                        {/* Question header */}
                        <div className={`flex items-start justify-between gap-4 border-b px-5 py-3.5 ${q.optional ? 'border-amber-50 bg-amber-50/60' : 'border-gray-50 bg-gray-50/60'}`}>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">
                                    <span className="mr-2 text-brand-600">Q{i + 1}.</span>
                                    {q.question}
                                </p>
                                {q.optional && (
                                    <span className="mt-1 inline-flex items-center gap-1 text-xs text-amber-600">
                                        <Star className="size-3" /> Optional
                                    </span>
                                )}
                            </div>
                            <span className="shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600">
                                {q.marks} mark{q.marks !== 1 ? 's' : ''}
                            </span>
                        </div>

                        {/* Answer area */}
                        <div className="p-5">
                            {q.type === 'mcq' && q.options ? (
                                <div className="space-y-2">
                                    {q.options.map((opt, oi) => (
                                        <label
                                            key={oi}
                                            className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                                                answers[i] === String(oi)
                                                    ? 'border-brand-400 bg-brand-50 font-medium text-brand-800'
                                                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-brand-200 hover:bg-brand-50/30'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name={`q-${i}`}
                                                value={String(oi)}
                                                checked={answers[i] === String(oi)}
                                                onChange={() => setAnswers((prev) => ({ ...prev, [i]: String(oi) }))}
                                                className="accent-brand-600"
                                            />
                                            {opt || <span className="italic text-gray-400">Option {oi + 1}</span>}
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <textarea
                                    rows={5}
                                    value={answers[i] ?? ''}
                                    onChange={(e) => setAnswers((prev) => ({ ...prev, [i]: e.target.value }))}
                                    placeholder="Type your answer here…"
                                    className="w-full resize-y rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-400/20"
                                />
                            )}
                        </div>
                    </div>
                ))}

                {/* Submit button */}
                <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 py-3 md:px-6">
                    <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
                        <p className="text-xs text-gray-500">
                            {answeredCount} of {assessment.questions.length} answered
                        </p>
                        <button
                            onClick={() => setShowConfirm(true)}
                            disabled={submitting}
                            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-brand-700 disabled:opacity-60 active:scale-95"
                        >
                            <Send className="size-4" />
                            Submit Assessment
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirm dialog */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="p-6">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
                                <AlertTriangle className="size-6 text-amber-500" />
                            </div>
                            <h3 className="mb-1 text-base font-bold text-gray-900">Submit Assessment?</h3>
                            <p className="text-sm text-gray-500">
                                You have answered {answeredCount} of {assessment.questions.length} questions.
                                Once submitted you cannot make changes.
                            </p>
                        </div>
                        <div className="flex gap-2 border-t border-gray-100 bg-gray-50 px-6 py-4">
                            <button onClick={() => setShowConfirm(false)} className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100">
                                Go Back
                            </button>
                            <button onClick={() => { setShowConfirm(false); doSubmit(); }} className="flex-1 rounded-xl bg-brand-600 py-2.5 text-sm font-bold text-white hover:bg-brand-700">
                                Yes, Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

AssessmentShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Assessments', href: '/my-assessments' },
        { title: 'Assessment', href: '#' },
    ],
};
