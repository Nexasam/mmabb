import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Award, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Course } from '@/types';

type Props = {
    courses: Course[];
};

export default function CoursesIndex({ courses }: Props) {
    return (
        <>
            <Head title="Training Courses" />

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-0 pt-20">
                <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <span className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-200">
                            Training Programmes
                        </span>
                        <h1 className="mb-4 font-heading text-4xl font-extrabold leading-tight text-white lg:text-5xl">
                            Our Courses
                        </h1>
                        <p className="text-lg leading-relaxed text-brand-100">
                            Specialist clinical training programmes for healthcare professionals in paediatric complex
                            care. CPD accredited and delivered across the UK.
                        </p>
                    </div>
                </div>
                <div className="pointer-events-none leading-none">
                    <svg viewBox="0 0 1440 60" className="block w-full fill-white" preserveAspectRatio="none">
                        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
                    </svg>
                </div>
            </section>

            {/* ── Course listing ────────────────────────────────────────────── */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {courses.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-gray-200 py-20 text-center text-gray-400">
                            No courses are currently available. Please check back soon.
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {courses.map((course) => (
                                <div
                                    key={course.id}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                                >
                                    {/* Coloured top band */}
                                    <div className="flex items-center gap-3 bg-brand-700 px-6 py-4">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                                            <Award className="size-4 text-white" />
                                        </div>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-brand-100">
                                            Clinical Course
                                        </span>
                                    </div>

                                    {/* Body */}
                                    <div className="flex flex-1 flex-col p-6">
                                        <h2 className="mb-3 text-base font-bold leading-snug text-gray-900 group-hover:text-brand-700 transition-colors">
                                            {course.title}
                                        </h2>
                                        <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-500">
                                            {course.description}
                                        </p>

                                        {/* Meta tags */}
                                        <div className="mb-5 flex flex-wrap gap-2">
                                            {course.duration && (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                                                    <Clock className="size-3" /> {course.duration}
                                                </span>
                                            )}
                                            {course.location && (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                                                    <MapPin className="size-3" /> {course.location}
                                                </span>
                                            )}
                                            {course.accreditation && (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                                                    <Award className="size-3" /> CPD
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <Button asChild className="flex-1 bg-brand-600 text-white hover:bg-brand-700">
                                                <Link href={`/courses/${course.slug}`}>
                                                    View Details <ArrowRight className="ml-1 size-3.5" />
                                                </Link>
                                            </Button>
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="border-brand-200 text-brand-700 hover:bg-brand-50"
                                            >
                                                <Link href={`/courses/${course.slug}/apply`}>Apply</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── CTA strip ─────────────────────────────────────────────────── */}
            <section className="border-t border-gray-100 bg-gray-50 py-14">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-3 text-2xl font-extrabold text-gray-900">
                        Not sure which course is right for you?
                    </h2>
                    <p className="mb-6 text-gray-500">
                        Get in touch and our team will help you find the right training programme for your needs.
                    </p>
                    <Button asChild size="lg" className="bg-brand-600 text-white hover:bg-brand-700">
                        <Link href="/contact">Speak to Our Team</Link>
                    </Button>
                </div>
            </section>
        </>
    );
}
