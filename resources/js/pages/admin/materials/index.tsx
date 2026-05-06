import { Head, router, useForm } from '@inertiajs/react';
import { FileText, Settings2, Trash2, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';
import type { Course, Material } from '@/types';

type CourseWithMaterials = Pick<Course, 'id' | 'title'> & { materials: Material[] };

function formatFileSize(bytes: number | null): string {
    if (bytes === null) return '';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes; let unit = 0;
    while (size >= 1024 && unit < units.length - 1) { size /= 1024; unit++; }
    return `${Math.round(size * 10) / 10} ${units[unit]}`;
}

export default function AdminMaterialsIndex({ courses }: { courses: CourseWithMaterials[] }) {
    const [uploadOpen, setUploadOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const totalMaterials = courses.reduce((sum, c) => sum + c.materials.length, 0);

    const { data, setData, post, processing, errors, reset } = useForm<{
        course_id: string; title: string; file: File | null; sort_order: string;
    }>({ course_id: '', title: '', file: null, sort_order: '0' });

    function handleUpload(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/materials', { forceFormData: true, onSuccess: () => { reset(); setUploadOpen(false); } });
    }

    function handleDelete(material: Material) {
        if (!confirm(`Delete "${material.title}"? This cannot be undone.`)) return;
        router.delete(`/admin/materials/${material.id}`, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Materials — Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600">
                            <Settings2 className="size-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Course Materials
                            </h1>
                            <p className="text-sm text-gray-500">
                                {totalMaterials} PDF{totalMaterials !== 1 ? 's' : ''} across {courses.length} course{courses.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>

                    <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                        <DialogTrigger asChild>
                            <button className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-brand-700 active:scale-95">
                                <Upload className="size-4" />
                                Upload Material
                            </button>
                        </DialogTrigger>
                        <DialogContent className="overflow-hidden rounded-2xl p-0 shadow-2xl sm:max-w-md">
                            {/* Coloured header */}
                            <div className="bg-gradient-to-br from-brand-700 to-brand-500 px-6 py-5 text-white">
                                <DialogHeader>
                                    <DialogTitle
                                        className="text-lg font-extrabold text-white"
                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                    >
                                        Upload Course Material
                                    </DialogTitle>
                                    <p className="mt-0.5 text-sm text-brand-200">
                                        Upload a PDF file to make it available to approved applicants.
                                    </p>
                                </DialogHeader>
                            </div>

                            <form onSubmit={handleUpload} className="space-y-4 px-6 py-5">
                                <div className="grid gap-1.5">
                                    <Label className="text-sm font-semibold text-gray-700">Course</Label>
                                    <Select value={data.course_id} onValueChange={(v) => setData('course_id', v)}>
                                        <SelectTrigger className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:border-brand-500">
                                            <SelectValue placeholder="Select a course…" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            {courses.map((c) => (
                                                <SelectItem key={c.id} value={String(c.id)}>{c.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.course_id} />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="title" className="text-sm font-semibold text-gray-700">Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="e.g. Day 1 Workbook"
                                        className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:border-brand-500 focus:bg-white"
                                    />
                                    <InputError message={errors.title} />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="file" className="text-sm font-semibold text-gray-700">
                                        PDF File <span className="font-normal text-gray-400">(max 50 MB)</span>
                                    </Label>
                                    <Input
                                        id="file"
                                        type="file"
                                        accept=".pdf"
                                        ref={fileInputRef}
                                        onChange={(e) => setData('file', e.target.files?.[0] ?? null)}
                                        className="h-11 rounded-xl border-gray-200 bg-gray-50 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-50 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-brand-700"
                                    />
                                    <InputError message={errors.file} />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="sort_order" className="text-sm font-semibold text-gray-700">Sort Order</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        min="0"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', e.target.value)}
                                        className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:border-brand-500 focus:bg-white"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setUploadOpen(false)}
                                        className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-300/30 transition-all hover:from-brand-700 hover:to-brand-600 disabled:opacity-60 active:scale-95"
                                    >
                                        {processing && <Spinner className="size-3.5" />}
                                        Upload Material
                                    </button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Course cards */}
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
                                        {course.materials.length} file{course.materials.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                                <div className="px-6 py-2">
                                    {course.materials.length === 0 ? (
                                        <p className="py-4 text-sm text-gray-400">No materials uploaded yet.</p>
                                    ) : (
                                        <ul className="divide-y divide-gray-50">
                                            {course.materials.map((material) => (
                                                <li key={material.id} className="flex items-center justify-between gap-4 py-3.5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50">
                                                            <FileText className="size-4 text-red-500" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-semibold text-gray-800">{material.title}</div>
                                                            <div className="text-xs text-gray-400">
                                                                {material.file_name}{material.file_size ? ` · ${formatFileSize(material.file_size)}` : ''}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDelete(material)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                                                        aria-label={`Delete ${material.title}`}
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

AdminMaterialsIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/applications' },
        { title: 'Materials', href: '/admin/materials' },
    ],
};
