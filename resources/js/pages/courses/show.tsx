import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Award, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Course, CurriculumDay } from '@/types';

type Props = {
    course: Course;
};

function CurriculumDayCard({ day }: { day: CurriculumDay }) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-3 bg-brand-700 px-5 py-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                    {day.day.replace(/\D/g, '')}
                </div>
                <span className="font-semibold text-white">{day.title}</span>
            </div>
            <ul className="divide-y divide-gray-50 p-5">
                {day.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                        <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand-500" />
                        <span className="text-sm text-gray-600">{topic}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function CourseShow({ course }: Props) {
    return (
        <>
            <Head title={course.title} />

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-0 pt-16">
                <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
                    <Link
                        href="/courses"
                        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-200 transition-colors hover:text-white"
                    >
                        ← Back to Courses
                    </Link>
                    <div className="max-w-3xl">
                        <div className="mb-3 flex flex-wrap gap-3 text-sm text-brand-200">
                            {course.duration && (
                                <span className="flex items-center gap-1.5">
                                    <Clock className="size-4" /> {course.duration}
                                </span>
                            )}
                            {course.location && (
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="size-4" /> {course.location}
                                </span>
                            )}
                            {course.accreditation && (
                                <span className="flex items-center gap-1.5">
                                    <Award className="size-4" /> {course.accreditation}
                                </span>
                            )}
                        </div>
                        <h1 className="mb-4 font-heading text-3xl font-extrabold leading-tight text-white lg:text-4xl">{course.title}</h1>
                        <p className="text-lg leading-relaxed text-brand-100">{course.description}</p>
                    </div>
                </div>
                <div className="pointer-events-none leading-none">
                    <svg viewBox="0 0 1440 60" className="block w-full fill-white" preserveAspectRatio="none">
                        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
                    </svg>
                </div>
            </section>

            {/* ── Body ─────────────────────────────────────────────────────── */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-3">

                    {/* Main content */}
                    <div className="space-y-12 lg:col-span-2">

                        {/* Overview */}
                        {course.overview && (
                            <section>
                                <h2 className="mb-4 text-2xl font-extrabold text-gray-900">Course Overview</h2>
                                <p className="leading-relaxed text-gray-600">{course.overview}</p>
                            </section>
                        )}

                        {/* Learning objectives */}
                        {course.learning_objectives && course.learning_objectives.length > 0 && (
                            <section>
                                <h2 className="mb-5 text-2xl font-extrabold text-gray-900">Learning Objectives</h2>
                                <ul className="space-y-3">
                                    {course.learning_objectives.map((objective, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600">
                                                <CheckCircle className="size-3 text-white" />
                                            </div>
                                            <span className="text-sm leading-relaxed text-gray-700">{objective}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Curriculum */}
                        {course.curriculum && course.curriculum.length > 0 && (
                            <section>
                                <h2 className="mb-6 text-2xl font-extrabold text-gray-900">Course Curriculum</h2>
                                <div className="space-y-4">
                                    {course.curriculum.map((day, i) => (
                                        <CurriculumDayCard key={i} day={day} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Accreditation */}
                        {course.accreditation && (
                            <section>
                                <h2 className="mb-4 text-2xl font-extrabold text-gray-900">Accreditation</h2>
                                <div className="flex items-center gap-4 rounded-xl border border-brand-100 bg-brand-50 p-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-600">
                                        <Award className="size-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{course.accreditation}</div>
                                        <div className="text-sm text-gray-500">
                                            This course is accredited and contributes to your CPD portfolio.
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sticky sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">

                            {/* Apply card */}
                            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
                                <div className="bg-brand-700 px-6 py-4 text-white">
                                    <div className="text-xs font-semibold uppercase tracking-wider text-brand-200">
                                        Register Interest
                                    </div>
                                    {course.price && (
                                        <div className="mt-1 text-3xl font-extrabold">£{course.price}</div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <p className="mb-4 text-sm text-gray-500">
                                        Secure your place on this course. Complete the application form to register
                                        your interest.
                                    </p>
                                    <Button asChild className="w-full bg-brand-600 text-white hover:bg-brand-700">
                                        <Link href={`/courses/${course.slug}/apply`}>
                                            Apply Now <ArrowRight className="ml-1.5 size-4" />
                                        </Link>
                                    </Button>

                                    <div className="mt-5 space-y-2.5 border-t border-gray-100 pt-5 text-xs text-gray-400">
                                        {course.duration && (
                                            <div className="flex items-center gap-2">
                                                <Clock className="size-3.5 text-brand-500" />
                                                Duration: {course.duration}
                                            </div>
                                        )}
                                        {course.location && (
                                            <div className="flex items-center gap-2">
                                                <MapPin className="size-3.5 text-brand-500" />
                                                {course.location}
                                            </div>
                                        )}
                                        {course.accreditation && (
                                            <div className="flex items-center gap-2">
                                                <Award className="size-3.5 text-brand-500" />
                                                {course.accreditation}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Help card */}
                            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                                <div className="mb-2 flex items-center gap-2">
                                    <Phone className="size-4 text-brand-600" />
                                    <span className="text-sm font-semibold text-gray-900">Need help?</span>
                                </div>
                                <p className="mb-3 text-xs text-gray-500">
                                    Speak to our team about this course or discuss training options for your
                                    organisation.
                                </p>
                                <Link
                                    href="/contact"
                                    className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                                >
                                    Contact Us →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
