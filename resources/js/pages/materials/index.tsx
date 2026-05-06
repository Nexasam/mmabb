import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Eye, FolderOpen, FileText } from 'lucide-react';
import type { Course, Material } from '@/types';

type CourseWithMaterials = Pick<Course, 'id' | 'title' | 'slug'> & { materials: Material[] };

function formatFileSize(bytes: number | null): string {
    if (bytes === null) return '';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unit = 0;
    while (size >= 1024 && unit < units.length - 1) { size /= 1024; unit++; }
    return `${Math.round(size * 10) / 10} ${units[unit]}`;
}

export default function MaterialsIndex({ courses }: { courses: CourseWithMaterials[] }) {
    return (
        <>
            <Head title="My Materials" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1
                        className="text-2xl font-extrabold text-gray-900"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Course Materials
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        View materials for your approved courses
                    </p>
                </div>

                {courses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
                            <FolderOpen className="size-8 text-brand-400" />
                        </div>
                        <h3 className="mb-1 font-bold text-gray-700">No materials available</h3>
                        <p className="mb-5 text-sm text-gray-400">
                            Materials become available once your application is approved.
                        </p>
                        <Link
                            href="/my-applications"
                            className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100"
                        >
                            View Applications <ArrowRight className="size-3.5" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-5">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                            >
                                {/* Course header */}
                                <div className="flex items-center gap-3 border-b border-gray-50 bg-gradient-to-r from-brand-50 to-white px-6 py-4">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
                                        <FileText className="size-4 text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">{course.title}</h3>
                                </div>

                                {/* Materials list */}
                                <div className="px-6 py-2">
                                    {course.materials.length === 0 ? (
                                        <p className="py-4 text-sm text-gray-400">
                                            No materials have been uploaded for this course yet.
                                        </p>
                                    ) : (
                                        <ul className="divide-y divide-gray-50">
                                            {course.materials.map((material) => (
                                                <li
                                                    key={material.id}
                                                    className="flex items-center justify-between gap-4 py-3.5"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50">
                                                            <FileText className="size-4 text-red-500" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-semibold text-gray-800">
                                                                {material.title}
                                                            </div>
                                                            {material.file_size && (
                                                                <div className="text-xs text-gray-400">
                                                                    PDF · {formatFileSize(material.file_size)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Link
                                                        href={`/materials/${material.id}/view`}
                                                        className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"
                                                    >
                                                        <Eye className="size-3.5" />
                                                        View
                                                    </Link>
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

MaterialsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Materials', href: '/my-materials' },
    ],
};
