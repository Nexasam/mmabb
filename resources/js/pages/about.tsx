import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Award, BookOpen, Brain, CheckCircle, GraduationCap, Heart, HeartPulse, Shield, Stethoscope, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const values = [
    {
        icon: Heart,
        title: 'Person-Centred',
        description: 'Every care plan is built around the individual — their needs, goals, and what matters most to them and their family.',
    },
    {
        icon: Shield,
        title: 'Safety First',
        description: 'Nurse-led oversight and rigorous clinical governance underpin everything we do, keeping the people we support safe.',
    },
    {
        icon: Users,
        title: 'Collaborative',
        description: 'We work in genuine partnership with ICBs, NHS teams, local authorities, families, and multidisciplinary teams.',
    },
    {
        icon: Award,
        title: 'Excellence',
        description: 'Rated GOOD by the CQC and committed to continuous improvement — we hold ourselves to the highest standards of care.',
    },
];

const trainingTopics = [
    { icon: Stethoscope, title: 'Tracheostomy Management',      desc: 'Paediatric & adult tracheostomy care and airway management'              },
    { icon: HeartPulse,  title: 'Home Ventilation',             desc: 'Invasive & non-invasive paediatric home ventilation and respiratory care' },
    { icon: BookOpen,    title: 'Enteral Feeding',               desc: 'PEG, PEJ, NG and JEJ feeding management'                                 },
    { icon: Brain,       title: 'Epilepsy & Rescue Medication',  desc: 'Epilepsy awareness and emergency rescue medication administration'        },
    { icon: Heart,       title: 'Basic Life Support',            desc: 'BLS and people moving and handling'                                       },
    { icon: Users,       title: 'Dysphagia Awareness',           desc: 'Recognition and safe management of swallowing difficulties'               },
];

export default function About() {
    return (
        <>
            <Head title="About Us | MMAB Healthcare" />

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-0 pt-20">
                <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <span className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-200">
                            About Us
                        </span>
                        <h1 className="mb-4 font-heading text-4xl font-extrabold leading-tight text-white lg:text-5xl">
                            About MMAB Healthcare
                        </h1>
                        <p className="text-lg leading-relaxed text-brand-100">
                            A CQC-rated GOOD, nurse-led home care provider delivering complex clinical care, mental
                            health and LD support, and domiciliary care to adults and young people across North
                            and South East England. <strong className="text-white">We Care.</strong>
                        </p>
                    </div>
                </div>
                <div className="pointer-events-none leading-none">
                    <svg viewBox="0 0 1440 60" className="block w-full fill-white" preserveAspectRatio="none">
                        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
                    </svg>
                </div>
            </section>

            {/* ── Who we are ───────────────────────────────────────────────── */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
                                Who We Are
                            </p>
                            <h2 className="mb-5 text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl">
                                Leaders in complex and clinical home care
                            </h2>
                            <p className="mb-4 leading-relaxed text-gray-600">
                                MMAB Healthcare is a trusted, nurse-led provider serving North and South East England.
                                Rated GOOD by the CQC, our most recent inspection noted: <em>"Management led by example,
                                with a strong focus on values and staff support."</em> We are dedicated to delivering
                                high-quality, personalised care and support to individuals in the comfort of their own homes.
                            </p>
                            <p className="mb-6 leading-relaxed text-gray-600">
                                Our clinical team are leaders in complex home care, supporting individuals with
                                neurological conditions, brain and spinal injury, tracheostomy, home ventilation,
                                enteral feeding, seizure management, mental health needs, learning disabilities, and
                                autism. Every care plan is developed thoughtfully in partnership with healthcare
                                professionals, keeping the individual — and their family — at the centre.
                            </p>
                            <Button asChild className="bg-brand-600 text-white hover:bg-brand-700">
                                <Link href="/contact">
                                    <BookOpen className="mr-2 size-4" />
                                    Refer a Package
                                </Link>
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <blockquote className="rounded-2xl bg-brand-50 p-8">
                                <p className="mb-4 text-lg font-medium italic leading-relaxed text-gray-700">
                                    "Management led by example, with a strong focus on values and staff support."
                                </p>
                                <footer className="text-sm font-semibold text-brand-700">
                                    — CQC Inspection Report
                                </footer>
                            </blockquote>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { value: 'GOOD',       label: 'CQC Rating'         },
                                    { value: 'Nurse-Led',  label: 'Clinical leadership' },
                                    { value: 'CPD',        label: 'Accredited training' },
                                    { value: 'NE England', label: 'Coverage area'       },
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

            {/* ── Leadership profile ───────────────────────────────────────── */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
                            Our Leadership
                        </p>
                        <h2 className="text-3xl font-extrabold text-gray-900 lg:text-4xl">
                            Led by expertise. Driven by care.
                        </h2>
                    </div>

                    <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 lg:flex">
                        {/* Accent bar */}
                        <div className="w-full bg-gradient-to-b from-brand-700 to-brand-500 lg:w-2 lg:bg-gradient-to-b" />

                        <div className="flex-1 p-8 lg:p-12">
                            <div className="mb-1 flex items-center gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100">
                                    <GraduationCap className="size-6 text-brand-700" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-xl font-extrabold text-gray-900">
                                        Rosemary Lanlehin
                                    </h3>
                                    <p className="text-sm font-semibold text-brand-600">
                                        Responsible Individual &amp; Registered Manager — MMAB Healthcare
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                                <div>
                                    <p className="mb-4 leading-relaxed text-gray-600">
                                        Rosemary is a highly accomplished Senior Neonatal Lecturer, Academic Programme
                                        Director, and Registered Manager with over three decades of blended experience
                                        across higher education, clinical leadership, and complex care consultancy.
                                    </p>
                                    <p className="mb-4 leading-relaxed text-gray-600">
                                        She served as Programme Director for the MSc Advanced Practice in Health and
                                        Social Care at City University London for 10 years, and as Route Leader for the
                                        BSc Nursing (Neonatal Route) for 20 years — designing curricula and mentoring
                                        senior neonatal nurses across major NHS trusts including Barts Health, Homerton,
                                        and UCLH.
                                    </p>
                                    <p className="leading-relaxed text-gray-600">
                                        As a widely published researcher and Fellow of the Royal College of Nursing and
                                        Royal Society of Medicine, Rosemary brings an unparalleled depth of clinical
                                        knowledge to the governance and strategic leadership of MMAB Healthcare.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">
                                        Credentials &amp; Affiliations
                                    </h4>
                                    {[
                                        'MRes Higher Education Research — Lancaster University',
                                        'MSc Social Research Methods & Statistics — City University London',
                                        'MA Higher Education — University of Greenwich',
                                        'RCN Full Member since 1990',
                                        'Royal Society of Medicine Associate Member since 2010',
                                        'RCN Scientific Committee for Advanced Practice — Peer Reviewer',
                                        'External Examiner, Birmingham City University (Nursing & Neonatal)',
                                        'NMC Registered (PIN: 90Y0244O)',
                                    ].map((item) => (
                                        <div key={item} className="flex items-start gap-2.5">
                                            <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand-500" />
                                            <span className="text-sm text-gray-600">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Values ───────────────────────────────────────────────────── */}
            <section className="py-20">
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

            {/* ── What we offer ────────────────────────────────────────────── */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div className="order-2 lg:order-1">
                            <ul className="space-y-4">
                                {[
                                    'Complex clinical care: nurse-led packages for neurological conditions, brain injury, spinal injury — including tracheostomy and airway management, PEG feeding, stoma and catheter care',
                                    'Mental health, learning disability & autism: personalised plans to promote emotional wellbeing, staff trained in condition-specific care, supporting independence and life skills',
                                    'Domiciliary & respite care: personal care, meal preparation, mobility, household tasks, community access — ongoing support or short-term respite, including compassionate end of life care',
                                    'Clinical training: CPD-accredited, delivered by experienced clinical educators with staff competency assessments for delegated nursing tasks',
                                    'Business consultancy: regulatory compliance audits, CQC inspection preparation, staff consultation support and other operational services',
                                    'Commissioner partnerships: working with ICBs, NHS teams, and local authorities across North and South East England',
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
                                What We Offer
                            </p>
                            <h2 className="mb-5 text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl">
                                A full spectrum of nurse-led care and support
                            </h2>
                            <p className="mb-6 leading-relaxed text-gray-600">
                                We are currently accepting new packages and are keen to support your team with
                                flexible, nurse-led solutions that prioritise safety, independence, and
                                person-centred care. Our training is CPD accredited and our consultancy helps
                                providers improve care quality and compliance.
                            </p>
                            <Button asChild className="bg-brand-600 text-white hover:bg-brand-700">
                                <Link href="/contact">
                                    Get in Touch <ArrowRight className="ml-1.5 size-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Clinical Training Topics ─────────────────────────────────── */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
                            CPD-Accredited Training
                        </p>
                        <h2 className="mb-3 text-3xl font-extrabold text-gray-900 lg:text-4xl">
                            What our training covers
                        </h2>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-500">
                            All training is designed and delivered by our clinical lead — drawing on over 30 years
                            of neonatal, paediatric, and complex care expertise spanning the NHS, independent sector,
                            and higher education.
                        </p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {trainingTopics.map((topic) => (
                            <div
                                key={topic.title}
                                className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                                    <topic.icon className="size-5 text-brand-600" />
                                </div>
                                <div>
                                    <h3 className="mb-1 font-bold text-gray-900">{topic.title}</h3>
                                    <p className="text-sm leading-relaxed text-gray-500">{topic.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <Button asChild className="bg-brand-600 text-white hover:bg-brand-700">
                            <Link href="/courses">
                                View Training Courses <ArrowRight className="ml-1.5 size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────────────── */}
            <section className="bg-brand-700 py-16 text-white">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-3 text-2xl font-extrabold lg:text-3xl">Work with MMAB Healthcare</h2>
                    <p className="mb-8 text-brand-100">
                        We are currently accepting new packages and are keen to support your team. Get in touch
                        to discuss a referral or find out more about our services.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg" className="bg-white font-semibold text-brand-700 hover:bg-brand-50">
                            <Link href="/contact">Refer a Package</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                            <Link href="/courses">Browse Training</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
