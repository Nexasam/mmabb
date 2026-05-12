import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BookOpen,
    ClipboardCheck,
    ClipboardList,
    FileText,
    Settings2,
    Users2,
} from 'lucide-react';
import { dashboard } from '@/routes';
import type { Auth } from '@/types';

// ─── Quick-action card ────────────────────────────────────────────────────────

function QuickCard({
    icon: Icon,
    title,
    description,
    href,
    cta,
    variant = 'default',
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    href: string;
    cta: string;
    variant?: 'default' | 'accent' | 'success';
}) {
    const styles = {
        default: {
            wrap: 'border-[#dddcf0] bg-gradient-to-br from-white to-[#f4f3fb] hover:border-brand-300 hover:shadow-brand-100/50',
            icon: 'bg-[#e8e7f6]',
            iconColor: 'text-brand-600',
            title: 'text-brand-900',
            desc: 'text-brand-700/70',
            link: 'text-brand-600 hover:text-brand-700',
            bar: 'from-brand-500 to-brand-300',
        },
        accent: {
            wrap: 'border-brand-400 bg-gradient-to-br from-brand-600 to-brand-800 hover:shadow-brand-400/30',
            icon: 'bg-white/20',
            iconColor: 'text-white',
            title: 'text-white',
            desc: 'text-brand-200',
            link: 'text-brand-100 hover:text-white',
            bar: '',
        },
        success: {
            wrap: 'border-emerald-200 bg-gradient-to-br from-white to-emerald-50 hover:shadow-emerald-100/60',
            icon: 'bg-emerald-500',
            iconColor: 'text-white',
            title: 'text-emerald-900',
            desc: 'text-emerald-700',
            link: 'text-emerald-700 hover:text-emerald-800',
            bar: 'from-emerald-500 to-emerald-300',
        },
    };

    const s = styles[variant];

    return (
        <div
            className={`group relative flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${s.wrap}`}
        >
            {/* Shimmer on hover */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <div className="flex flex-1 flex-col p-6">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${s.icon}`}>
                    <Icon className={`size-6 ${s.iconColor}`} strokeWidth={1.75} />
                </div>
                <h3 className={`mb-1.5 font-heading text-base font-bold ${s.title}`}>{title}</h3>
                <p className={`mb-5 flex-1 text-sm leading-relaxed ${s.desc}`}>{description}</p>
                <Link
                    href={href}
                    className={`inline-flex items-center gap-1.5 text-sm font-bold transition-all ${s.link}`}
                >
               
                    
                    {cta}
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                </Link>
            </div>

            {/* Bottom accent line — default & success only */}
            {variant !== 'accent' && (
                <div className={`h-0.5 w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full ${s.bar}`} />
            )}
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const firstName = auth.user.name.split(' ')[0];

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col">

                {/* ── Hero banner ── */}
                <div className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-500 px-6 py-8 md:px-8">
                    {/* Decorative blobs */}
                    <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-brand-400/20 blur-2xl" />

                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-200">
                                Dashboard
                            </p>
                            <h1
                                className="text-2xl font-extrabold text-white lg:text-3xl"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                Welcome back, {firstName} 👋
                            </h1>
                            <p className="mt-1 text-sm text-brand-200">
                                Manage your course applications and access your training materials.
                            </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            {auth.isAdmin && (
                                <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                                    Admin
                                </span>
                            )}
                            <Link
                                href="/courses"
                                className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-sm font-bold text-brand-700 shadow-md transition-all hover:bg-brand-50 active:scale-95"
                            >
                                <BookOpen className="size-4" />
                                Browse Courses
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── Main content ── */}
                <div className="flex-1 space-y-8 p-6 md:p-8">

                    {/* My Training */}
                    <section>
                        <div className="mb-4 flex items-center gap-3">
                            <div className="h-px flex-1 bg-[#dddcf0]" />
                            <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
                                My Training
                            </span>
                            <div className="h-px flex-1 bg-[#dddcf0]" />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <QuickCard
                                icon={BookOpen}
                                title="Browse Courses"
                                description="Explore our specialist paediatric complex care training programmes. CPD accredited and nurse-led."
                                href="/courses"
                                cta="View All Courses"
                            />
                            <QuickCard
                                icon={ClipboardList}
                                title="My Applications"
                                description="Track the status of your course applications in real time. Pending, approved, or rejected."
                                href="/my-applications"
                                cta="View Applications"
                            />
                        {auth.hasApprovedApplication ? (
                                <QuickCard
                                    icon={FileText}
                                    title="Course Materials"
                                    description="Your application has been approved. View your full course materials and resources now."
                                    href="/my-materials"
                                    cta="Access Materials"
                                    variant="success"
                                />
                            ) : (
                                <QuickCard
                                    icon={FileText}
                                    title="Course Materials"
                                    description="Materials become available once your application is approved by our team."
                                    href="/my-applications"
                                    cta="Check Application Status"
                                />
                            )}
                            {auth.hasApprovedApplication ? (
                                <QuickCard
                                    icon={ClipboardCheck}
                                    title="My Assessments"
                                    description="Take your course assessments and track your results. Timed and auto-marked where possible."
                                    href="/my-assessments"
                                    cta="View Assessments"
                                    variant="success"
                                />
                            ) : (
                                <QuickCard
                                    icon={ClipboardCheck}
                                    title="My Assessments"
                                    description="Assessments become available once your application is approved by our team."
                                    href="/my-applications"
                                    cta="Check Application Status"
                                />
                            )}
                        </div>
                    </section>

                    {/* Admin Panel */}
                    {auth.isAdmin && (
                        <section>
                            <div className="mb-4 flex items-center gap-3">
                                <div className="h-px flex-1 bg-[#dddcf0]" />
                                <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
                                    Admin Panel
                                </span>
                                <div className="h-px flex-1 bg-[#dddcf0]" />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <QuickCard
                                    icon={Users2}
                                    title="Manage Applications"
                                    description="Review, approve, or reject course applications from healthcare professionals across the UK."
                                    href="/admin/applications"
                                    cta="Open Applications"
                                />
                                <QuickCard
                                    icon={Settings2}
                                    title="Manage Materials"
                                    description="Upload and manage PDF course materials for approved applicants. Organised by course."
                                    href="/admin/materials"
                                    cta="Open Materials"
                                />
                            </div>
                        </section>
                    )}

                    {/* Quick links footer */}
                    <div className="rounded-2xl border border-[#dddcf0] bg-gradient-to-br from-white to-[#f4f3fb] p-5">
                        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                            Quick Links
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Paediatric Complex Care Course', href: '/courses/paediatric-complex-care-3-day' },
                                { label: 'Apply for a Course',             href: '/courses/paediatric-complex-care-3-day/apply' },
                                { label: 'About MMAB',                    href: '/about' },
                                { label: 'Contact Us',                    href: '/contact' },
                                { label: 'Account Settings',              href: '/settings/profile' },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="rounded-lg border border-[#dddcf0] bg-white px-3 py-1.5 text-xs font-medium text-brand-700 transition-colors hover:border-brand-300 hover:bg-[#e8e7f6] hover:text-brand-800"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: dashboard() }],
};
