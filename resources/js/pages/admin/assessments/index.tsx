import { Head, router, useForm } from '@inertiajs/react';
import { ClipboardCheck, Eye, GripVertical, Pencil, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';
import type { Course } from '@/types';

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
    time_limit_minutes: number;
    is_active: boolean;
    submissions_count: number;
    questions: Question[];
    instructions: string | null;
};

type CourseWithAssessments = Pick<Course, 'id' | 'title'> & { assessments: Assessment[] };

type FormData = {
    course_id: string;
    title: string;
    instructions: string;
    time_limit_minutes: string;
    questions: Question[];
};

function QuestionEditor({
    questions,
    onChange,
    errors,
}: {
    questions: Question[];
    onChange: (q: Question[]) => void;
    errors: Record<string, string>;
}) {
    function addQuestion() {
        onChange([...questions, { question: '', marks: 10, optional: false, type: 'text' }]);
    }

    function removeQuestion(i: number) {
        onChange(questions.filter((_, idx) => idx !== i));
    }

    function updateQuestion(i: number, field: keyof Question, value: unknown) {
        const updated = questions.map((q, idx) => {
            if (idx !== i) return q;
            const next = { ...q, [field]: value };
            // Reset MCQ fields when switching to text
            if (field === 'type' && value === 'text') {
                next.options = undefined;
                next.correct_index = null;
            }
            // Initialise options when switching to MCQ
            if (field === 'type' && value === 'mcq' && !next.options?.length) {
                next.options = ['', ''];
                next.correct_index = 0;
            }
            return next;
        });
        onChange(updated);
    }

    function updateOption(qi: number, oi: number, value: string) {
        const updated = questions.map((q, idx) => {
            if (idx !== qi) return q;
            const opts = [...(q.options ?? [])];
            opts[oi] = value;
            return { ...q, options: opts };
        });
        onChange(updated);
    }

    function addOption(qi: number) {
        const updated = questions.map((q, idx) => {
            if (idx !== qi) return q;
            return { ...q, options: [...(q.options ?? []), ''] };
        });
        onChange(updated);
    }

    function removeOption(qi: number, oi: number) {
        const updated = questions.map((q, idx) => {
            if (idx !== qi) return q;
            const opts = (q.options ?? []).filter((_, i) => i !== oi);
            const correct = q.correct_index ?? 0;
            return { ...q, options: opts, correct_index: correct >= opts.length ? 0 : correct };
        });
        onChange(updated);
    }

    return (
        <div className="space-y-3">
            {questions.map((q, i) => (
                <div key={i} className="rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                    <div className="flex gap-2">
                        <div className="mt-2 text-gray-300">
                            <GripVertical className="size-4" />
                        </div>
                        <div className="flex-1 space-y-2">
                            {/* Row 1: question text + marks + type + remove */}
                            <div className="flex gap-2">
                                <Input
                                    value={q.question}
                                    onChange={(e) => updateQuestion(i, 'question', e.target.value)}
                                    placeholder={`Question ${i + 1}`}
                                    className="h-9 flex-1 rounded-lg border-gray-200 bg-white text-sm"
                                />
                                <div className="flex items-center gap-1">
                                    <Input
                                        type="number"
                                        min="1"
                                        max="100"
                                        value={q.marks}
                                        onChange={(e) => updateQuestion(i, 'marks', parseInt(e.target.value) || 1)}
                                        className="h-9 w-14 rounded-lg border-gray-200 bg-white text-center text-sm"
                                        title="Marks"
                                    />
                                    <span className="text-xs text-gray-400">pts</span>
                                </div>
                                <Select
                                    value={q.type}
                                    onValueChange={(v) => updateQuestion(i, 'type', v as QuestionType)}
                                >
                                    <SelectTrigger className="h-9 w-24 rounded-lg border-gray-200 bg-white text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="text">Text</SelectItem>
                                        <SelectItem value="mcq">MCQ</SelectItem>
                                    </SelectContent>
                                </Select>
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(i)}
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>

                            {/* MCQ options */}
                            {q.type === 'mcq' && (
                                <div className="ml-1 space-y-1.5 rounded-lg border border-brand-100 bg-white p-3">
                                    <p className="text-xs font-semibold text-gray-500">Answer options — tick the correct one</p>
                                    {(q.options ?? []).map((opt, oi) => (
                                        <div key={oi} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name={`correct-${i}`}
                                                checked={q.correct_index === oi}
                                                onChange={() => updateQuestion(i, 'correct_index', oi)}
                                                className="accent-brand-600"
                                                title="Mark as correct"
                                            />
                                            <Input
                                                value={opt}
                                                onChange={(e) => updateOption(i, oi, e.target.value)}
                                                placeholder={`Option ${oi + 1}`}
                                                className="h-8 flex-1 rounded-lg border-gray-200 bg-gray-50 text-sm"
                                            />
                                            {(q.options ?? []).length > 2 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeOption(i, oi)}
                                                    className="text-red-400 hover:text-red-600"
                                                >
                                                    <X className="size-3.5" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addOption(i)}
                                        className="mt-1 flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
                                    >
                                        <Plus className="size-3" /> Add option
                                    </button>
                                </div>
                            )}

                            {/* Optional toggle */}
                            <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500 select-none">
                                <input
                                    type="checkbox"
                                    checked={q.optional}
                                    onChange={(e) => updateQuestion(i, 'optional', e.target.checked)}
                                    className="h-3.5 w-3.5 rounded border-gray-300 accent-brand-600"
                                />
                                <span>Optional <span className="text-gray-400">(excluded from score if skipped)</span></span>
                            </label>
                        </div>
                    </div>
                    {errors[`questions.${i}.question`] && (
                        <p className="mt-1 ml-6 text-xs text-red-500">{errors[`questions.${i}.question`]}</p>
                    )}
                </div>
            ))}
            <button
                type="button"
                onClick={addQuestion}
                className="flex items-center gap-1.5 rounded-lg border border-dashed border-brand-300 px-3 py-2 text-xs font-semibold text-brand-600 hover:bg-brand-50"
            >
                <Plus className="size-3.5" />
                Add Question
            </button>
        </div>
    );
}

function AssessmentFormDialog({
    open,
    onClose,
    courses,
    editAssessment,
}: {
    open: boolean;
    onClose: () => void;
    courses: CourseWithAssessments[];
    editAssessment?: Assessment & { course_id: number };
}) {
    const isEdit = !!editAssessment;
    const { data, setData, post, put, processing, errors, reset } = useForm<FormData>({
        course_id: editAssessment ? String(editAssessment.course_id) : '',
        title: editAssessment?.title ?? '',
        instructions: editAssessment?.instructions ?? '',
        time_limit_minutes: String(editAssessment?.time_limit_minutes ?? 60),
        questions: editAssessment?.questions ?? [{ question: '', marks: 20, optional: false, type: 'text' }],
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/assessments/${editAssessment!.id}`, { onSuccess: () => { reset(); onClose(); } });
        } else {
            post('/admin/assessments', { onSuccess: () => { reset(); onClose(); } });
        }
    }

    const totalMarks = data.questions.reduce((s, q) => s + (q.marks || 0), 0);

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl p-0 shadow-2xl sm:max-w-2xl">
                <div className="bg-gradient-to-br from-brand-700 to-brand-500 px-6 py-5 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-extrabold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            {isEdit ? 'Edit Assessment' : 'Create Assessment'}
                        </DialogTitle>
                        <p className="mt-0.5 text-sm text-brand-200">
                            Mix text and multiple-choice questions. MCQ answers are auto-marked.
                        </p>
                    </DialogHeader>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 px-6 py-5">
                    {!isEdit && (
                        <div className="grid gap-1.5">
                            <Label className="text-sm font-semibold text-gray-700">Course</Label>
                            <Select value={data.course_id} onValueChange={(v) => setData('course_id', v)}>
                                <SelectTrigger className="h-10 rounded-xl border-gray-200 bg-gray-50">
                                    <SelectValue placeholder="Select a course…" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((c) => (
                                        <SelectItem key={c.id} value={String(c.id)}>{c.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.course_id} />
                        </div>
                    )}

                    <div className="grid gap-1.5">
                        <Label className="text-sm font-semibold text-gray-700">Title</Label>
                        <Input
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="e.g. End of Module Assessment"
                            className="h-10 rounded-xl border-gray-200 bg-gray-50"
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-1.5">
                        <Label className="text-sm font-semibold text-gray-700">
                            Instructions <span className="font-normal text-gray-400">(optional)</span>
                        </Label>
                        <textarea
                            rows={2}
                            value={data.instructions}
                            onChange={(e) => setData('instructions', e.target.value)}
                            placeholder="Instructions shown to the student before they begin…"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-400/20"
                        />
                    </div>

                    <div className="grid gap-1.5">
                        <Label className="text-sm font-semibold text-gray-700">Time Limit (minutes)</Label>
                        <Input
                            type="number"
                            min="5"
                            max="480"
                            value={data.time_limit_minutes}
                            onChange={(e) => setData('time_limit_minutes', e.target.value)}
                            className="h-10 w-32 rounded-xl border-gray-200 bg-gray-50"
                        />
                        <InputError message={errors.time_limit_minutes} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-semibold text-gray-700">Questions</Label>
                            <span className="text-xs text-gray-400">Total: {totalMarks} marks</span>
                        </div>
                        <QuestionEditor
                            questions={data.questions}
                            onChange={(q) => setData('questions', q)}
                            errors={errors as Record<string, string>}
                        />
                        <InputError message={errors.questions} />
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
                        <button type="button" onClick={onClose} className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100">
                            Cancel
                        </button>
                        <button type="submit" disabled={processing} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-md disabled:opacity-60">
                            {processing && <Spinner className="size-3.5" />}
                            {isEdit ? 'Save Changes' : 'Create Assessment'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function AdminAssessmentsIndex({ courses }: { courses: CourseWithAssessments[] }) {
    const [createOpen, setCreateOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<(Assessment & { course_id: number }) | null>(null);

    function handleDelete(assessment: Assessment) {
        if (!confirm(`Delete "${assessment.title}"? All submissions will be lost.`)) return;
        router.delete(`/admin/assessments/${assessment.id}`, { preserveScroll: true });
    }

    const totalAssessments = courses.reduce((s, c) => s + c.assessments.length, 0);

    return (
        <>
            <Head title="Assessments — Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600">
                            <ClipboardCheck className="size-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Assessments
                            </h1>
                            <p className="text-sm text-gray-500">
                                {totalAssessments} assessment{totalAssessments !== 1 ? 's' : ''} across {courses.length} course{courses.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setCreateOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-md hover:bg-brand-700 active:scale-95">
                        <Plus className="size-4" /> New Assessment
                    </button>
                </div>

                {courses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-16 text-center">
                        <p className="text-sm text-gray-400">No active courses found.</p>
                    </div>
                ) : (
                    <div className="grid gap-5">
                        {courses.map((course) => (
                            <div key={course.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                                <div className="flex items-center justify-between border-b border-gray-50 bg-gradient-to-r from-brand-50 to-white px-6 py-4">
                                    <h3 className="font-bold text-gray-900">{course.title}</h3>
                                    <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                                        {course.assessments.length} assessment{course.assessments.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                                <div className="px-6 py-2">
                                    {course.assessments.length === 0 ? (
                                        <p className="py-4 text-sm text-gray-400">No assessments yet.</p>
                                    ) : (
                                        <ul className="divide-y divide-gray-50">
                                            {course.assessments.map((assessment) => {
                                                const mcqCount = assessment.questions.filter((q) => q.type === 'mcq').length;
                                                const textCount = assessment.questions.length - mcqCount;
                                                return (
                                                    <li key={assessment.id} className="flex items-center justify-between gap-4 py-3.5">
                                                        <div>
                                                            <div className="text-sm font-semibold text-gray-800">{assessment.title}</div>
                                                            <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                                                                {textCount > 0 && <span>{textCount} text</span>}
                                                                {mcqCount > 0 && <span className="rounded-full bg-blue-50 px-1.5 py-0.5 text-blue-600">{mcqCount} MCQ</span>}
                                                                <span>{assessment.time_limit_minutes} min</span>
                                                                <span>{assessment.submissions_count} submission{assessment.submissions_count !== 1 ? 's' : ''}</span>
                                                                {!assessment.is_active && <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-500">Inactive</span>}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <a href={`/admin/assessments/${assessment.id}/submissions`} className="flex h-8 w-8 items-center justify-center rounded-lg text-brand-500 hover:bg-brand-50" title="View submissions">
                                                                <Eye className="size-4" />
                                                            </a>
                                                            <button onClick={() => setEditTarget({ ...assessment, course_id: course.id })} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600" title="Edit">
                                                                <Pencil className="size-4" />
                                                            </button>
                                                            <button onClick={() => handleDelete(assessment)} className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600" title="Delete">
                                                                <Trash2 className="size-4" />
                                                            </button>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AssessmentFormDialog open={createOpen} onClose={() => setCreateOpen(false)} courses={courses} />
            {editTarget && <AssessmentFormDialog open={true} onClose={() => setEditTarget(null)} courses={courses} editAssessment={editTarget} />}
        </>
    );
}

AdminAssessmentsIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/applications' },
        { title: 'Assessments', href: '/admin/assessments' },
    ],
};
