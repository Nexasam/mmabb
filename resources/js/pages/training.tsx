import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    AlertCircle,
    ArrowRight,
    Award,
    BookOpen,
    Brain,
    CheckCircle,
    Clipboard,
    ClipboardCheck,
    ExternalLink,
    GraduationCap,
    Heart,
    HeartPulse,
    Shield,
    Stethoscope,
    Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// ─── Core training courses ───────────────────────────────────────────────────

const coreTraining = [
    {
        icon: Users,
        title: 'People Moving and Handling',
        description:
            'Safe manual handling techniques for healthcare and domiciliary care settings, compliant with Health and Safety Executive (HSE) guidelines and tailored to the needs of individuals with complex physical needs.',
        highlights: [
            'Risk assessment and safe handling principles',
            'Practical techniques for bed, chair, and floor transfers',
            'Use of slings, hoists, and slide sheets',
            'Postural care and pressure area management',
            'Annual refresher available',
        ],
    },
    {
        icon: ClipboardCheck,
        title: 'Complex Care Competency Assessment',
        description:
            'Structured competency assessments for support staff delivering delegated nursing tasks — tracheostomy care, home ventilation, enteral feeding, and emergency medication administration.',
        highlights: [
            'One-to-one practical assessment with registered nurse',
            'Covers competency in delegated clinical tasks',
            'Sign-off for staff working with complex care packages',
            'Ensures safe practice and clinical governance',
            'Meets commissioner and ICB standards',
        ],
    },
    {
        icon: Clipboard,
        title: 'Staff Supervision and Sign-off',
        description:
            'Formal supervision sessions for support staff working in complex and clinical care settings, ensuring safe ongoing practice, addressing learning needs, and maintaining quality standards.',
        highlights: [
            'Structured reflection and support from senior clinician',
            'Review of delegated clinical tasks and care plans',
            'Identification of further learning needs',
            'Safeguarding and clinical governance review',
            'Documentation for audit and compliance',
        ],
    },
];

// ─── Train the Trainer stats ─────────────────────────────────────────────────

const trainerStats = [
    { value: 'CPD Accredited', label: 'Professional Development' },
    { value: 'Nurse-Led', label: 'Clinical Expertise' },
    { value: 'In-House', label: 'Your Setting' },
    { value: 'Bespoke', label: 'Tailored Content' },
];

export default function Training() {
    return (
        <>
            <Head title="Training We Offer | MMAB Healthcare" />

            {/* ── HERO ──────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-0 pt-20">
                <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <span className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-200">
                            Clinical Training
                        </span>
                        <h1 className="mb-4 font-heading text-4xl font-extrabold leading-tight text-white lg:text-5xl">
                            Training We Offer
                        </h1>
                        <p className="text-lg leading-relaxed text-brand-100">
                            CPD-accredited clinical training programmes for healthcare professionals and support staff
                            working with children, young people, and adults with complex care needs, neurological
                            conditions, and learning disabilities. Designed and delivered by our clinical lead with
                            over 30 years of neonatal, paediatric, and complex care expertise.
                        </p>
                    </div>
                </div>
                <div className="pointer-events-none leading-none">
                    <svg viewBox="0 0 1440 60" className="block w-full fill-white" preserveAspectRatio="none">
                        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
                    </svg>
                </div>
            </section>

            {/* ── COMING SOON BANNER ────────────────────────────────────────── */}
            <section className="bg-white py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        {...fadeUp()}
                        className="overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 shadow-sm lg:flex lg:items-center lg:justify-between lg:gap-8 lg:p-8"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500 shadow-md">
                                <AlertCircle className="size-6 text-white" />
                            </div>
                            <div>
                                <h2 className="mb-2 font-heading text-xl font-extrabold text-gray-900">
                                    Coming Soon: Complex Care Train the Trainer
                                </h2>
                                <p className="max-w-2xl text-sm leading-relaxed text-gray-700">
                                    A 3-day CPD-accredited programme for senior clinicians who wish to deliver
                                    complex care training within their own organisations. Covers paediatric
                                    tracheostomy, home ventilation, enteral feeding, and emergency medication
                                    administration — with full trainer resources, slide decks, and ongoing clinical
                                    support. Register your interest below.
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 flex shrink-0 flex-wrap gap-3 lg:mt-0">
                            <Button asChild size="lg" className="bg-amber-600 text-white hover:bg-amber-700">
                                <Link href="/contact">
                                    <GraduationCap className="mr-2 size-4" />
                                    Register Interest
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── CORE TRAINING COURSES ─────────────────────────────────────── */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()} className="mb-14 text-center">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
                            Core Programmes
                        </p>
                        <h2 className="mb-4 font-heading text-3xl font-extrabold text-gray-900 lg:text-4xl">
                            Essential training for complex care teams
                        </h2>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-500">
                            These core programmes can be delivered in-house for your organisation, with content
                            tailored to your setting and staff needs.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {coreTraining.map((course, i) => (
                            <motion.div
                                key={course.title}
                                {...fadeUp(i * 0.1)}
                                className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="border-b border-gray-50 bg-gradient-to-br from-brand-50 to-brand-100/30 px-6 py-5">
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 shadow-md">
                                        <course.icon className="size-6 text-white" />
                                    </div>
                                    <h3 className="font-heading text-lg font-bold text-gray-900">{course.title}</h3>
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <p className="mb-5 text-sm leading-relaxed text-gray-600">
                                        {course.description}
                                    </p>
                                    <div className="mt-auto space-y-2.5">
                                        <div className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                                            What's covered
                                        </div>
                                        {course.highlights.map((highlight) => (
                                            <div key={highlight} className="flex items-start gap-2.5">
                                                <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand-500" />
                                                <span className="text-sm text-gray-600">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div {...fadeUp(0.3)} className="mt-12 text-center">
                        <p className="mb-5 text-sm text-gray-500">
                            All training can be delivered in-house, online, or at our training facilities.
                        </p>
                        <Button asChild size="lg" className="bg-brand-600 text-white hover:bg-brand-700">
                            <Link href="/contact">
                                <BookOpen className="mr-2 size-4" />
                                Request In-House Training
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* ── FULL CATALOGUE LINKS ──────────────────────────────────────── */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()} className="mb-12 text-center">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
                            Browse All Training
                        </p>
                        <h2 className="mb-4 font-heading text-3xl font-extrabold text-gray-900 lg:text-4xl">
                            Full course catalogue
                        </h2>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-500">
                            We offer a full range of CPD-accredited complex care training programmes and bespoke
                            clinical training sessions for health and social care teams.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <motion.a
                            {...fadeUp(0.1)}
                            href="https://mmabconsulting.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-100 transition-colors group-hover:bg-brand-200">
                                <ExternalLink className="size-7 text-brand-700" />
                            </div>
                            <h3 className="mb-3 font-heading text-xl font-bold text-gray-900 transition-colors group-hover:text-brand-700">
                                MMAB Consulting Website
                            </h3>
                            <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">
                                Visit our main training website for the full catalogue of courses, booking
                                information, and detailed programme content.
                            </p>
                            <div className="flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-700">
                                Browse all courses
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </motion.a>

                        <motion.div
                            {...fadeUp(0.2)}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
                        >
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-100">
                                <GraduationCap className="size-7 text-brand-700" />
                            </div>
                            <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">
                                CPD Course Portal
                            </h3>
                            <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">
                                Access your enrolled courses, view course materials, submit assessments, and track
                                your CPD hours through our online learning platform.
                            </p>
                            <Button asChild className="w-full bg-brand-600 text-white hover:bg-brand-700">
                                <Link href="/courses">
                                    View My Courses
                                    <ArrowRight className="ml-2 size-4" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── TRAIN THE TRAINER FEATURE ─────────────────────────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 py-20 text-white">
                <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-brand-400/15 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()} className="mb-12 text-center">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-200">
                            Coming 2026
                        </span>
                        <h2 className="mb-4 font-heading text-3xl font-extrabold lg:text-4xl">
                            Complex Care Train the Trainer
                        </h2>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-brand-100">
                            A comprehensive 3-day programme for experienced clinicians who want to deliver complex
                            care training within their own organisations — with full trainer resources, slide decks,
                            and ongoing clinical support.
                        </p>
                    </motion.div>

                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <motion.div {...fadeUp(0.1)}>
                            <h3 className="mb-5 text-xl font-bold">Programme overview</h3>
                            <ul className="space-y-4">
                                {[
                                    'Clinical content: Paediatric tracheostomy care and management, home ventilation (invasive and non-invasive), enteral feeding (PEG, NG, JEJ), emergency medication administration (buccal midazolam, rectal diazepam)',
                                    'Train the trainer pedagogy: Adult learning principles, facilitation skills, assessment design, clinical teaching methods',
                                    'Resources provided: Full slide decks, trainer notes, learner workbooks, competency assessment tools, e-learning modules',
                                    'Post-course support: Access to clinical advisory team, ongoing updates to training materials, peer supervision network',
                                    'CPD accredited: 18 CPD hours awarded on completion',
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                                            <CheckCircle className="size-3 text-white" />
                                        </div>
                                        <span className="text-sm leading-relaxed text-brand-100">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div {...fadeUp(0.2)} className="space-y-6">
                            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                                <h4 className="mb-4 text-lg font-bold">Who is this for?</h4>
                                <p className="mb-4 text-sm leading-relaxed text-brand-100">
                                    Senior nurses, clinical educators, and advanced practitioners working in
                                    paediatric complex care, community nursing, or specialist education teams who
                                    want to train their own staff in complex care competencies.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['Registered Nurses', 'Clinical Educators', 'Advanced Practitioners', 'Specialist Teams'].map(
                                        (badge) => (
                                            <span
                                                key={badge}
                                                className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white"
                                            >
                                                {badge}
                                            </span>
                                        ),
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Button asChild size="lg" className="bg-white font-semibold text-brand-700 hover:bg-brand-50">
                                    <Link href="/contact">
                                        <GraduationCap className="mr-2 size-4" />
                                        Register Interest
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="border-white/50 text-white hover:bg-white/10"
                                >
                                    <Link href="/contact">Get in touch</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div {...fadeUp(0.3)} className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {trainerStats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-xl border border-white/10 bg-white/10 p-5 text-center backdrop-blur-sm"
                            >
                                <div className="mb-1 font-heading text-2xl font-extrabold text-white">
                                    {stat.value}
                                </div>
                                <div className="text-xs text-brand-200">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── ACCREDITATION STRIP ───────────────────────────────────────── */}
            <div className="border-b border-gray-100 bg-white py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                        {[
                            { icon: Award, label: 'CPD Accredited' },
                            { icon: Stethoscope, label: 'Nurse-Led Delivery' },
                            { icon: GraduationCap, label: '30+ Years Clinical Experience' },
                        ].map((item, i) => (
                            <span key={item.label} className="flex items-center gap-2">
                                {i > 0 && <span className="h-4 w-px bg-gray-200" />}
                                <item.icon className="size-4 text-brand-500" />
                                {item.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
