import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Award, BookOpen, CheckCircle, Heart, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const values = [
    {
        icon: Heart,
        title: 'Child-Centred',
        description:
            'Everything we do is guided by the best interests of children and young people with complex needs.',
    },
    {
        icon: Shield,
        title: 'Evidence-Based',
        description: 'Our curriculum is grounded in current clinical evidence and best practice guidelines.',
    },
    {
        icon: Users,
        title: 'Collaborative',
        description: 'We work alongside healthcare teams to deliver training that fits real-world practice.',
    },
    {
        icon: Award,
        title: 'Excellence',
        description:
            'We hold ourselves to the highest standards in clinical education and professional development.',
    },
];

const team = [
    {
        name: 'Clinical Lead',
        role: 'Paediatric Complex Care Specialist',
        bio: 'Over 15 years of experience in paediatric complex care nursing across NHS and independent settings.',
    },
    {
        name: 'Training Director',
        role: 'Education & Development Lead',
        bio: 'Specialist in clinical education design with a focus on competency-based learning frameworks.',
    },
    {
        name: 'Programme Coordinator',
        role: 'Course Delivery & Support',
        bio: 'Dedicated to ensuring every participant receives the support they need throughout their training journey.',
    },
];

export default function About() {
    return (
        <>
            <Head title="About Us" />

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-0 pt-20">
                <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <span className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-200">
                            About Us
                        </span>
                        <h1 className="mb-4 font-heading text-4xl font-extrabold leading-tight text-white lg:text-5xl">
                            About MMAB Consulting
                        </h1>
                        <p className="text-lg leading-relaxed text-brand-100">
                            Specialist healthcare training consultancy dedicated to improving outcomes for children and
                            young people with complex care needs.
                        </p>
                    </div>
                </div>
                <div className="pointer-events-none leading-none">
                    <svg viewBox="0 0 1440 60" className="block w-full fill-white" preserveAspectRatio="none">
                        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
                    </svg>
                </div>
            </section>

            {/* ── Mission ──────────────────────────────────────────────────── */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
                                Our Mission
                            </p>
                            <h2 className="mb-5 text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl">
                                Equipping professionals to deliver outstanding paediatric care
                            </h2>
                            <p className="mb-4 leading-relaxed text-gray-600">
                                MMAB Consulting was founded with a clear purpose: to equip healthcare professionals
                                with the specialist knowledge and clinical skills needed to deliver outstanding care to
                                children and young people with complex health needs.
                            </p>
                            <p className="mb-6 leading-relaxed text-gray-600">
                                We understand the unique challenges faced by nurses, therapists, and allied health
                                professionals in this field. Our training programmes are designed to bridge the gap
                                between theory and practice, providing immediately applicable skills that make a real
                                difference to patient outcomes.
                            </p>
                            <Button asChild className="bg-brand-600 text-white hover:bg-brand-700">
                                <Link href="/courses">
                                    <BookOpen className="mr-2 size-4" />
                                    Explore Our Courses
                                </Link>
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <blockquote className="rounded-2xl bg-brand-50 p-8">
                                <p className="mb-4 text-lg font-medium italic leading-relaxed text-gray-700">
                                    "Our goal is simple: better-trained professionals deliver better outcomes for the
                                    children and families who depend on them."
                                </p>
                                <footer className="text-sm font-semibold text-brand-700">
                                    — MMAB Consulting Founders
                                </footer>
                            </blockquote>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { value: '500+', label: 'Professionals trained' },
                                    { value: '10+', label: 'Years experience' },
                                    { value: 'CPD', label: 'Accredited courses' },
                                    { value: 'UK', label: 'Nationwide delivery' },
                                ].map((s) => (
                                    <div key={s.label} className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
                                        <div className="text-2xl font-extrabold text-brand-700">{s.value}</div>
                                        <div className="mt-0.5 text-xs text-gray-500">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Values ───────────────────────────────────────────────────── */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
                            What Drives Us
                        </p>
                        <h2 className="text-3xl font-extrabold text-gray-900 lg:text-4xl">Our Values</h2>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm"
                            >
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50">
                                    <value.icon className="size-7 text-brand-600" />
                                </div>
                                <h3 className="mb-2 font-bold text-gray-900">{value.title}</h3>
                                <p className="text-sm leading-relaxed text-gray-500">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── What to expect ───────────────────────────────────────────── */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div className="order-2 lg:order-1">
                            <ul className="space-y-4">
                                {[
                                    'Clinically experienced trainers with real-world paediatric complex care backgrounds',
                                    'Evidence-based curriculum aligned with current national guidelines',
                                    'Practical simulation and hands-on skills stations',
                                    'Small group sizes for focused, personalised learning',
                                    'Full digital course materials and post-course resources',
                                    'CPD certificate upon successful completion',
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600">
                                            <CheckCircle className="size-3 text-white" />
                                        </div>
                                        <span className="text-sm leading-relaxed text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="order-1 lg:order-2">
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
                                What to Expect
                            </p>
                            <h2 className="mb-5 text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl">
                                What you can expect from our training
                            </h2>
                            <p className="mb-6 leading-relaxed text-gray-600">
                                Every MMAB programme is designed to be immediately applicable to your clinical
                                practice. We combine evidence-based theory with practical, hands-on learning to ensure
                                you leave with the confidence and competence to make a real difference.
                            </p>
                            <Button asChild className="bg-brand-600 text-white hover:bg-brand-700">
                                <Link href="/courses">
                                    View Our Courses <ArrowRight className="ml-1.5 size-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────────────── */}
            <section className="bg-brand-700 py-16 text-white">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-3 text-2xl font-extrabold lg:text-3xl">Work with MMAB Consulting</h2>
                    <p className="mb-8 text-brand-100">
                        Whether you're looking to upskill your team or advance your own practice, we'd love to hear
                        from you.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg" className="bg-white font-semibold text-brand-700 hover:bg-brand-50">
                            <Link href="/contact">Get in Touch</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                            <Link href="/courses">Browse Courses</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
