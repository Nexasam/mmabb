import { Head, router, useForm } from '@inertiajs/react';
import { BookOpen, Pencil, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';

// ── Types ─────────────────────────────────────────────────────────────────────

type CurriculumDay = {
    day: string;
    title: string;
    topics: string[];
};

type Course = {
    id: number;
    title: string;
    slug: string;
    description: string;
    overview: string | null;
    accreditation: string | null;
    duration: string | null;
    location: string | null;
    price: string;
    is_active: boolean;
    learning_objectives: string[] | null;
    curriculum: CurriculumDay[] | null;
    applications_count: number;
    assessments_count: number;
    materials_count: number;
    created_at: string;
};

type FormData = {
    title: string;
    description: string;
    overview: string;
    accreditation: string;
    duration: string;
    location: string;
    price: string;
    is_active: boolean;
    learning_objectives: string[];
    curriculum: CurriculumDay[];
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function emptyDay(): CurriculumDay {
    return { day: '', title: '', topics: [''] };
}

function emptyForm(): FormData {
    return {
        title: '',
        description: '',
        overview: '',
        accreditation: '',
        duration: '',
        location: '',
        price: '0',
        is_active: true,
        learning_objectives: [''],
        curriculum: [emptyDay()],
    };
}

function courseToForm(c: Course): FormData {
    return {
        title: c.title,
        description: c.description,
        overview: c.overview ?? '',
        accreditation: c.accreditation ?? '',
        duration: c.duration ?? '',
        location: c.location ?? '',
        price: c.price,
        is_active: c.is_active,
        learning_objectives: c.learning_objectives?.length ? c.learning_objectives : [''],
        curriculum: c.curriculum?.length ? c.curriculum : [emptyDay()],
    };
}


// ── Learning Objectives Editor ────────────────────────────────────────────────

function ObjectivesEditor({
    items,
    onChange,
    errors,
}: {
    items: string[];
    onChange: (v: string[]) => void;
    errors: Record<string, string>;
}) {
    function update(i: number, val: string) {
        const next = [...items];
        next[i] = val;
        onChange(next);
    }
    function remove(i: number) { onChange(items.filter((_, idx) => idx !== i)); }
    function add() { onChange([...items, '']); }

    return (
        <div className="space-y-2">
            {items.map((obj, i) => (
                <div key={i} className="flex gap-2">
                    <Input
                        value={obj}
                        onChange={(e) => update(i, e.target.value)}
                        placeholder={`Objective ${i + 1}`}
                        className="h-9 flex-1 rounded-lg border-gray-200 bg-gray-50 text-sm"
                    />
                    {items.length > 1 && (
                        <button type="button" onClick={() => remove(i)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600">
                            <X className="size-4" />
                        </button>
                    )}
                    {errors[`learning_objectives.${i}`] && (
                        <p className="text-xs text-red-500">{errors[`learning_objectives.${i}`]}</p>
                    )}
                </div>
            ))}
            <button type="button" onClick={add}
                className="flex items-center gap-1.5 rounded-lg border border-dashed border-brand-300 px-3 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-50">
                <Plus className="size-3.5" /> Add Objective
            </button>
        </div>
    );
}

// ── Curriculum Editor ─────────────────────────────────────────────────────────

function CurriculumEditor({
    days,
    onChange,
    errors,
}: {
    days: CurriculumDay[];
    onChange: (v: CurriculumDay[]) => void;
    errors: Record<string, string>;
}) {
    function updateDay(i: number, field: keyof CurriculumDay, val: unknown) {
        const next = days.map((d, idx) => idx === i ? { ...d, [field]: val } : d);
        onChange(next);
    }
    function updateTopic(di: number, ti: number, val: string) {
        const next = days.map((d, idx) => {
            if (idx !== di) return d;
            const topics = [...d.topics];
            topics[ti] = val;
            return { ...d, topics };
        });
        onChange(next);
    }
    function addTopic(di: number) {
        updateDay(di, 'topics', [...days[di].topics, '']);
    }
    function removeTopic(di: number, ti: number) {
        updateDay(di, 'topics', days[di].topics.filter((_, i) => i !== ti));
    }
    function removeDay(i: number) { onChange(days.filter((_, idx) => idx !== i)); }
    function addDay() { onChange([...days, emptyDay()]); }

    return (
        <div className="space-y-3">
            {days.map((day, di) => (
                <div key={di} className="rounded-xl border border-gray-100 bg-gray-50/50 p-3 space-y-2">
                    <div className="flex gap-2">
                        <Input
                            value={day.day}
                            onChange={(e) => updateDay(di, 'day', e.target.value)}
                            placeholder="Day label (e.g. Day 1)"
                            className="h-9 w-28 rounded-lg border-gray-200 bg-white text-sm"
                        />
                        <Input
                            value={day.title}
                            onChange={(e) => updateDay(di, 'title', e.target.value)}
                            placeholder="Day title"
                            className="h-9 flex-1 rounded-lg border-gray-200 bg-white text-sm"
                        />
                        {days.length > 1 && (
                            <button type="button" onClick={() => removeDay(di)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600">
                                <X className="size-4" />
                            </button>
                        )}
                    </div>
                    <div className="ml-2 space-y-1.5">
                        {day.topics.map((topic, ti) => (
                            <div key={ti} className="flex gap-2">
                                <Input
                                    value={topic}
                                    onChange={(e) => updateTopic(di, ti, e.target.value)}
                                    placeholder={`Topic ${ti + 1}`}
                                    className="h-8 flex-1 rounded-lg border-gray-200 bg-white text-sm"
                                />
                                {day.topics.length > 1 && (
                                    <button type="button" onClick={() => removeTopic(di, ti)}
                                        className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600">
                                        <X className="size-3.5" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={() => addTopic(di)}
                            className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700">
                            <Plus className="size-3" /> Add topic
                        </button>
                    </div>
                    {errors[`curriculum.${di}.day`] && <p className="text-xs text-red-500">{errors[`curriculum.${di}.day`]}</p>}
                    {errors[`curriculum.${di}.title`] && <p className="text-xs text-red-500">{errors[`curriculum.${di}.title`]}</p>}
                </div>
            ))}
            <button type="button" onClick={addDay}
                className="flex items-center gap-1.5 rounded-lg border border-dashed border-brand-300 px-3 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-50">
                <Plus className="size-3.5" /> Add Day
            </button>
        </div>
    );
}


// ── Course Form Dialog ────────────────────────────────────────────────────────

function CourseFormDialog({
    open,
    onClose,
    editCourse,
}: {
    open: boolean;
    onClose: () => void;
    editCourse?: Course;
}) {
    const isEdit = !!editCourse;
    const { data, setData, post, put, processing, errors, reset, setDefaults } = useForm<FormData>(
        editCourse ? courseToForm(editCourse) : emptyForm(),
    );

    // Sync form when editCourse changes
    useEffect(() => {
        if (open) {
            const next = editCourse ? courseToForm(editCourse) : emptyForm();
            setDefaults(next);
            reset();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, editCourse?.id]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/courses/${editCourse!.id}`, { onSuccess: () => { reset(); onClose(); } });
        } else {
            post('/admin/courses', { onSuccess: () => { reset(); onClose(); } });
        }
    }

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl p-0 shadow-2xl sm:max-w-2xl">
                <div className="bg-gradient-to-br from-brand-700 to-brand-500 px-6 py-5 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-extrabold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            {isEdit ? 'Edit Course' : 'New Course'}
                        </DialogTitle>
                        <p className="mt-0.5 text-sm text-brand-200">
                            {isEdit ? 'Update the course details below.' : 'Fill in the details to create a new course.'}
                        </p>
                    </DialogHeader>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 px-6 py-5">
                    {/* Title */}
                    <div className="grid gap-1.5">
                        <Label className="text-sm font-semibold text-gray-700">Title <span className="text-red-500">*</span></Label>
                        <Input value={data.title} onChange={(e) => setData('title', e.target.value)}
                            placeholder="e.g. Paediatric Complex Care: 3-Day Course"
                            className="h-10 rounded-xl border-gray-200 bg-gray-50" />
                        <InputError message={errors.title} />
                    </div>

                    {/* Description */}
                    <div className="grid gap-1.5">
                        <Label className="text-sm font-semibold text-gray-700">Short Description <span className="text-red-500">*</span></Label>
                        <textarea rows={3} value={data.description} onChange={(e) => setData('description', e.target.value)}
                            placeholder="Brief summary shown on the courses listing page…"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-400/20" />
                        <InputError message={errors.description} />
                    </div>

                    {/* Overview */}
                    <div className="grid gap-1.5">
                        <Label className="text-sm font-semibold text-gray-700">Full Overview <span className="font-normal text-gray-400">(optional)</span></Label>
                        <textarea rows={4} value={data.overview} onChange={(e) => setData('overview', e.target.value)}
                            placeholder="Detailed overview shown on the course page…"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-400/20" />
                        <InputError message={errors.overview} />
                    </div>

                    {/* Meta row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-1.5">
                            <Label className="text-sm font-semibold text-gray-700">Duration</Label>
                            <Input value={data.duration} onChange={(e) => setData('duration', e.target.value)}
                                placeholder="e.g. 3 Days"
                                className="h-10 rounded-xl border-gray-200 bg-gray-50" />
                        </div>
                        <div className="grid gap-1.5">
                            <Label className="text-sm font-semibold text-gray-700">Location</Label>
                            <Input value={data.location} onChange={(e) => setData('location', e.target.value)}
                                placeholder="e.g. UK Venues"
                                className="h-10 rounded-xl border-gray-200 bg-gray-50" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-1.5">
                            <Label className="text-sm font-semibold text-gray-700">Price (£) <span className="text-red-500">*</span></Label>
                            <Input type="number" min="0" step="0.01" value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="h-10 rounded-xl border-gray-200 bg-gray-50" />
                            <InputError message={errors.price} />
                        </div>
                        <div className="grid gap-1.5">
                            <Label className="text-sm font-semibold text-gray-700">Accreditation</Label>
                            <Input value={data.accreditation} onChange={(e) => setData('accreditation', e.target.value)}
                                placeholder="e.g. CPD Accredited — 21 Hours"
                                className="h-10 rounded-xl border-gray-200 bg-gray-50" />
                        </div>
                    </div>

                    {/* Active toggle */}
                    <label className="flex cursor-pointer items-center gap-3 select-none">
                        <input type="checkbox" checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 accent-brand-600" />
                        <span className="text-sm font-semibold text-gray-700">Active <span className="font-normal text-gray-400">(visible to applicants)</span></span>
                    </label>

                    {/* Learning objectives */}
                    <div className="grid gap-2">
                        <Label className="text-sm font-semibold text-gray-700">Learning Objectives</Label>
                        <ObjectivesEditor
                            items={data.learning_objectives}
                            onChange={(v) => setData('learning_objectives', v)}
                            errors={errors as Record<string, string>}
                        />
                    </div>

                    {/* Curriculum */}
                    <div className="grid gap-2">
                        <Label className="text-sm font-semibold text-gray-700">Curriculum</Label>
                        <CurriculumEditor
                            days={data.curriculum}
                            onChange={(v) => setData('curriculum', v)}
                            errors={errors as Record<string, string>}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
                        <button type="button" onClick={onClose}
                            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100">
                            Cancel
                        </button>
                        <button type="submit" disabled={processing}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-md disabled:opacity-60 active:scale-95">
                            {processing && <Spinner className="size-3.5" />}
                            {isEdit ? 'Save Changes' : 'Create Course'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}


// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminCoursesIndex({ courses }: { courses: Course[] }) {
    const [createOpen, setCreateOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<Course | null>(null);

    function handleDelete(course: Course) {
        if (!confirm(`Delete "${course.title}"? This will also remove all applications, materials, and assessments for this course.`)) return;
        router.delete(`/admin/courses/${course.id}`, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Courses — Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600">
                            <BookOpen className="size-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Courses
                            </h1>
                            <p className="text-sm text-gray-500">
                                {courses.length} course{courses.length !== 1 ? 's' : ''} total
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setCreateOpen(true)}
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-brand-700 active:scale-95">
                        <Plus className="size-4" />
                        New Course
                    </button>
                </div>

                {/* Course list */}
                {courses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-16 text-center">
                        <BookOpen className="mb-3 size-8 text-gray-300" />
                        <p className="text-sm font-semibold text-gray-500">No courses yet</p>
                        <p className="mt-1 text-xs text-gray-400">Click "New Course" to add your first one.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {courses.map((course) => (
                            <div key={course.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                                <div className="flex items-start justify-between gap-4 px-6 py-4">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="font-bold text-gray-900">{course.title}</h3>
                                            {!course.is_active && (
                                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
                                                    Inactive
                                                </span>
                                            )}
                                        </div>
                                        <p className="mt-1 line-clamp-2 text-sm text-gray-500">{course.description}</p>
                                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                                            {course.duration && <span>⏱ {course.duration}</span>}
                                            {course.location && <span>📍 {course.location}</span>}
                                            <span>£{parseFloat(course.price).toFixed(2)}</span>
                                            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-brand-600">
                                                {course.applications_count} application{course.applications_count !== 1 ? 's' : ''}
                                            </span>
                                            <span>{course.assessments_count} assessment{course.assessments_count !== 1 ? 's' : ''}</span>
                                            <span>{course.materials_count} material{course.materials_count !== 1 ? 's' : ''}</span>
                                        </div>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-1.5">
                                        <a
                                            href={`/courses/${course.slug}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-brand-500 hover:bg-brand-50"
                                            title="View public page"
                                        >
                                            <BookOpen className="size-4" />
                                        </a>
                                        <button
                                            onClick={() => setEditTarget(course)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                                            title="Edit"
                                        >
                                            <Pencil className="size-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course)}
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

            <CourseFormDialog open={createOpen} onClose={() => setCreateOpen(false)} />
            {editTarget && (
                <CourseFormDialog open={true} onClose={() => setEditTarget(null)} editCourse={editTarget} />
            )}
        </>
    );
}

AdminCoursesIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/applications' },
        { title: 'Courses', href: '/admin/courses' },
    ],
};
