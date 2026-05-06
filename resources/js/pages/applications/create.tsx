import { Head, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import type { Auth, Course } from '@/types';

type Props = {
    course: Pick<Course, 'id' | 'title' | 'slug'>;
};

export default function ApplicationCreate({ course }: Props) {
    const { auth } = usePage<{ auth: Auth }>().props;

    const { data, setData, post, processing, errors } = useForm({
        course_id: course.id,
        full_name: auth?.user?.name ?? '',
        email: auth?.user?.email ?? '',
        phone: '',
        professional_background: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/applications');
    }

    return (
        <>
            <Head title={`Apply — ${course.title}`} />

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-0 pt-14">
                <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                    <Link
                        href={`/courses/${course.slug}`}
                        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-200 transition-colors hover:text-white"
                    >
                        <ArrowLeft className="size-4" /> Back to Course
                    </Link>
                    <h1
                        className="text-3xl font-extrabold text-white lg:text-4xl"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Apply for Course
                    </h1>
                    <p className="mt-2 text-brand-200">{course.title}</p>
                </div>
                <div className="pointer-events-none leading-none">
                    <svg viewBox="0 0 1440 48" className="block w-full fill-gray-50" preserveAspectRatio="none">
                        <path d="M0,24 C480,48 960,0 1440,24 L1440,48 L0,48 Z" />
                    </svg>
                </div>
            </section>

            {/* Form */}
            <div className="bg-gray-50 pb-20">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="-mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                        <div className="border-b border-gray-50 bg-gradient-to-r from-brand-50 to-white px-6 py-4">
                            <h2
                                className="font-bold text-gray-900"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                Application Form
                            </h2>
                            <p className="text-xs text-gray-400">
                                All fields marked * are required
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 p-6">
                            <input type="hidden" name="course_id" value={data.course_id} />

                            <div className="grid gap-1.5">
                                <Label htmlFor="full_name" className="text-sm font-semibold text-gray-700">
                                    Full Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="full_name"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    placeholder="Your full name"
                                    required
                                    className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:border-brand-500 focus:bg-white"
                                />
                                <InputError message={errors.full_name} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                    Email Address <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:border-brand-500 focus:bg-white"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                                    Phone Number <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="+44 7700 000000"
                                    required
                                    className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:border-brand-500 focus:bg-white"
                                />
                                <InputError message={errors.phone} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="professional_background" className="text-sm font-semibold text-gray-700">
                                    Professional Background <span className="text-red-500">*</span>
                                </Label>
                                <textarea
                                    id="professional_background"
                                    rows={5}
                                    value={data.professional_background}
                                    onChange={(e) => setData('professional_background', e.target.value)}
                                    placeholder="Describe your current role, clinical experience, and why you are applying for this course…"
                                    required
                                    className="flex w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm shadow-xs outline-none transition-colors placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
                                />
                                <InputError message={errors.professional_background} />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 py-3 text-sm font-bold text-white shadow-md shadow-brand-300/30 transition-all duration-200 hover:from-brand-700 hover:to-brand-600 hover:shadow-lg disabled:opacity-60 active:scale-[0.98]"
                            >
                                {processing ? (
                                    <Spinner className="size-4" />
                                ) : (
                                    <>
                                        <Send className="size-4" />
                                        Submit Application
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
