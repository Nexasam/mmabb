import { Link } from '@inertiajs/react';
import { Award, CheckCircle, ShieldCheck, Users } from 'lucide-react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

const trustPoints = [
    { icon: ShieldCheck, text: 'CPD Accredited — 21 hours per programme' },
    { icon: Users,       text: 'Trusted by 500+ healthcare professionals' },
    { icon: Award,       text: 'Nurse-led, evidence-based curriculum' },
    { icon: CheckCircle, text: 'Nationwide UK delivery' },
];

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen bg-white">

            {/* ── Left panel — brand / trust ── */}
            <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 p-12 lg:flex lg:w-5/12 xl:w-2/5">
                {/* Decorative blobs */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-400/15 blur-3xl" />

                {/* Logo */}
                <Link href={home()} className="relative z-10 flex items-center gap-3">
                    <img
                        src="/images/logo.webp"
                        alt="MMAB Consulting"
                        className="h-11 w-auto object-contain brightness-0 invert"
                    />
                    <div className="border-l border-white/20 pl-3">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-200">
                            Healthcare Training
                        </div>
                        <div className="text-[9px] text-white/40">
                            Paediatric Complex Care
                        </div>
                    </div>
                </Link>

                {/* Centre copy */}
                <div className="relative z-10 my-auto">
                    <h2
                        className="mb-4 text-3xl font-extrabold leading-tight text-white xl:text-4xl"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Specialist care,
                        <br />
                        <span className="text-brand-200">tailored for</span>
                        <br />
                        complex needs
                    </h2>
                    <p className="mb-8 text-sm leading-relaxed text-brand-200">
                        Access your training materials, track your applications, and manage your
                        professional development — all in one place.
                    </p>

                    {/* Trust points */}
                    <ul className="space-y-3">
                        {trustPoints.map((point) => (
                            <li key={point.text} className="flex items-center gap-3">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                                    <point.icon className="size-3.5 text-brand-200" />
                                </div>
                                <span className="text-xs font-medium text-brand-100">
                                    {point.text}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bottom quote */}
                <div className="relative z-10">
                    <blockquote className="border-l-2 border-brand-400 pl-4">
                        <p className="text-xs italic leading-relaxed text-brand-200">
                            "The course completely transformed how I approach complex care. I left
                            feeling genuinely confident."
                        </p>
                        <footer className="mt-2 text-[10px] font-semibold text-brand-300">
                            — Sarah Mitchell, Paediatric Community Nurse
                        </footer>
                    </blockquote>
                </div>
            </div>

            {/* ── Right panel — form ── */}
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
                {/* Mobile logo */}
                <div className="mb-8 flex w-full max-w-md items-center justify-between lg:hidden">
                    <Link href={home()} className="flex items-center gap-2">
                        <img
                            src="/images/logo.webp"
                            alt="MMAB Consulting"
                            className="h-9 w-auto object-contain"
                        />
                    </Link>
                    <Link
                        href={home()}
                        className="text-xs font-medium text-brand-600 hover:text-brand-700"
                    >
                        ← Back to site
                    </Link>
                </div>

                <div className="w-full max-w-md">
                    {/* Form header */}
                    <div className="mb-8">
                        <h1
                            className="mb-1.5 text-2xl font-extrabold text-gray-900"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            {title}
                        </h1>
                        {description && (
                            <p className="text-sm text-gray-500">{description}</p>
                        )}
                    </div>

                    {/* Form content */}
                    {children}
                </div>

                {/* Back to site — desktop */}
                <div className="mt-10 hidden w-full max-w-md lg:block">
                    <Link
                        href={home()}
                        className="text-xs font-medium text-gray-400 transition-colors hover:text-brand-600"
                    >
                        ← Back to MMAB Consulting
                    </Link>
                </div>
            </div>
        </div>
    );
}
