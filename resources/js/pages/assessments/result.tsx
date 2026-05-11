import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

type Question = { question: string; marks: number };
type Assessment = { id: number; title: string; questions: Question[] };
type Submission = {
    answers: { question_index: number; answer: string }[];
    submitted_at: string;
    score: number | null;
    marker_notes: string | null;
    marked_at: string | null;
};

export default function AssessmentResult({
    assessment,
    submission,
}: {
    assessment: Assessment;
    submission: Submission;
}) {
    const isMarked = submission.marked_at !== null;
    const answerMap: Record<number, string> = {};
    submission.answers.forEach((a) => { answerMap[a.question_index] = a.answer; });

    return (
        <>
            <Head title={`Result — ${assessment.title}`} />

            <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-6">
                {/* Result banner */}
                <div className={`overflow-hidden rounded-2xl ${isMarked ? 'bg-gradient-to-br from-brand-700 to-brand-500' : 'bg-gradient-to-br from-slate-700 to-slate-500'} p-6 text-white`}>
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Assessment Result</p>
                            <h1 className="mt-1 text-2xl font-extrabold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                {assessment.title}
                            </h1>
                            <p className="mt-1 text-sm opacity-80">
                                Submitted {new Date(submission.submitted_at).toLocaleDateString('en-GB', { dateStyle: 'long' })}
                            </p>
                        </div>
                        {isMarked ? (
                            <div className="text-right">
                                <div className="text-5xl font-extrabold">{submission.score}%</div>
                                <div className="text-sm opacity-80">Final Score</div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold">
                                <Clock className="size-4" />
                                Awaiting mark
                            </div>
                        )}
                    </div>

                    {isMarked && submission.marker_notes && (
                        <div className="mt-4 rounded-xl bg-white/15 p-4 text-sm">
                            <p className="font-semibold">Marker's Notes</p>
                            <p className="mt-1 opacity-90">{submission.marker_notes}</p>
                        </div>
                    )}
                </div>

                {!isMarked && (
                    <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                        <AlertCircle className="size-5 shrink-0" />
                        <p>Your submission is being reviewed. You'll be able to see your score once it's been marked.</p>
                    </div>
                )}

                {/* Answers review */}
                <div className="space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">Your Answers</h2>
                    {assessment.questions.map((q, i) => (
                        <div key={i} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                            <div className="flex items-start justify-between gap-4 border-b border-gray-50 bg-gray-50/60 px-5 py-3.5">
                                <p className="text-sm font-semibold text-gray-900">
                                    <span className="mr-2 text-brand-600">Q{i + 1}.</span>
                                    {q.question}
                                </p>
                                <span className="shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600">
                                    {q.marks} mark{q.marks !== 1 ? 's' : ''}
                                </span>
                            </div>
                            <div className="px-5 py-4">
                                {answerMap[i] ? (
                                    <p className="whitespace-pre-wrap text-sm text-gray-700">{answerMap[i]}</p>
                                ) : (
                                    <p className="text-sm italic text-gray-400">No answer provided</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link
                        href="/my-assessments"
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                        Back to Assessments
                    </Link>
                </div>
            </div>
        </>
    );
}

AssessmentResult.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Assessments', href: '/my-assessments' },
        { title: 'Result', href: '#' },
    ],
};
