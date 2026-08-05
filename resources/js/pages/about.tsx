import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Award, BookOpen, Brain, CheckCircle, GraduationCap, Heart, HeartPulse, Shield, Stethoscope, Users, Target, Sparkles, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

const values = [
    {
        icon: Heart,
        title: 'Person-Centred Care',
        description: 'Every care plan is built around the individual—their needs, preferences, goals, and what truly matters to them and their family.',
    },
    {
        icon: Shield,
        title: 'Safety & Quality',
        description: 'Nurse-led oversight, rigorous clinical governance, and a commitment to continuous improvement keep the people we support safe.',
    },
    {
        icon: Users,
        title: 'Compassion',
        description: 'We treat every person with dignity, respect, and genuine kindness—supporting not just clinical needs, but emotional wellbeing.',
    },
    {
        icon: Award,
        title: 'Professionalism',
        description: 'CQC-rated Good and clinically led, we maintain the highest standards in everything we do—from staff training to care delivery.',
    },
    {
        icon: Target,
        title: 'Reliability',
        description: 'Families and commissioners trust us to deliver consistent, high-quality care—mobilising quickly and maintaining stability over time.',
    },
    {
        icon: Lightbulb,
        title: 'Continuous Learning',
        description: 'Our commitment to CPD-accredited training and evidence-based practice ensures our team stays at the forefront of complex care.',
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
            <Head title="About MMAB Consulting & Healthcare | CQC Good Provider" />

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 pb-0 pt-20">
                <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-100">
                            About Us
                        </span>
                        <h1 className="mb-5 font-heading text-4xl font-extrabold leading-tight text-white lg:text-5xl">
                            About MMAB Consulting & Healthcare
                        </h1>
                        <p className="mb-4 text-xl leading-relaxed text-brand-50">
                            We are a CQC-rated Good, nurse-led provider delivering specialist complex care to adults and children across North and South East England.
                        </p>
                        <p className="text-lg leading-relaxed text-brand-100">
                            Our mission is to enable people with complex clinical needs to live safely, independently, and with dignity in their own homes—supported by experienced professionals who genuinely care.
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
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
                                Who We Are
                            </p>
                            <h2 className="mb-5 font-heading text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl">
                                A trusted provider of complex care in the community
                            </h2>
                            <p className="mb-4 text-lg leading-relaxed text-gray-700">
                                MMAB Consulting & Healthcare is a CQC-registered provider rated 'Good', delivering tailored complex care packages for individuals with significant clinical, physical, and neurological needs. Our experienced teams support individuals in their own homes, supported living environments, residential settings, rehabilitation pathways, and transitional care arrangements—with the capacity to mobilise services rapidly whenever required.
                            </p>
                            <p className="mb-6 leading-relaxed text-gray-600">
                                We work in close partnership with case managers, multidisciplinary teams (MDTs), healthcare professionals, commissioners, individuals, and their families. Together, we deliver person-centred care that promotes independence, rehabilitation, overall wellbeing, and positive long-term outcomes.
                            </p>
                            <Button asChild className="bg-brand-600 text-white hover:bg-brand-700">
                                <Link href="/contact">
                                    <BookOpen className="mr-2 size-4" />
                                    Get in Touch
                                </Link>
                            </Button>
                        </div>

                        <div className="space-y-5">
                            {/* Professional care image */}
                            <div className="overflow-hidden rounded-2xl shadow-lg">
                                <img 
                                    src="https://images.pexels.com/photos/7551657/pexels-photo-7551657.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" 
                                    alt="Healthcare professional providing compassionate one-on-one support and person-centred care at home"
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            
                            <blockquote className="rounded-2xl border border-brand-100 bg-brand-50 p-8 shadow-sm">
                                <p className="mb-4 text-lg font-medium italic leading-relaxed text-gray-800">
                                    "Management led by example, with a strong focus on values and staff support."
                                </p>
                                <footer className="text-sm font-semibold text-brand-700">
                                    — CQC Inspection Report
                                </footer>
                            </blockquote>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { value: 'CQC Good',       label: 'Quality Rating'         },
                                    { value: 'Nurse-Led',      label: 'Clinical Oversight'     },
                                    { value: 'CPD Accredited', label: 'Training Programmes'    },
                                    { value: 'Nationwide',     label: 'Coverage'               },
                                ].map((s) => (
                                    <div key={s.label} className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm">
                                        <div className="text-2xl font-extrabold text-brand-700">{s.value}</div>
                                        <div className="mt-1 text-xs font-medium text-gray-500">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Mission, Vision & Values ─────────────────────────────────── */}
            <section className="bg-gradient-to-br from-gray-50 to-brand-50/20 py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-14 text-center">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
                            Our Purpose
                        </p>
                        <h2 className="font-heading text-3xl font-extrabold text-gray-900 lg:text-4xl">Mission, Vision & Values</h2>
                    </div>

                    <div className="mb-16 grid gap-8 lg:grid-cols-2">
                        {/* Mission */}
                        <div className="rounded-2xl border border-brand-100 bg-white p-8 shadow-sm">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-100">
                                <Target className="size-7 text-brand-600" />
                            </div>
                            <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">Our Mission</h3>
                            <p className="leading-relaxed text-gray-600">
                                To deliver high-quality, person-centred complex care that enables adults and children with complex clinical needs to live safely, independently, and with dignity in their own homes—supported by experienced professionals who genuinely care.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="rounded-2xl border border-brand-100 bg-white p-8 shadow-sm">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-100">
                                <Sparkles className="size-7 text-brand-600" />
                            </div>
                            <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">Our Vision</h3>
                            <p className="leading-relaxed text-gray-600">
                                To be recognized as a leading provider of specialist complex care in England—known for clinical excellence, compassionate support, and a commitment to enabling people to live the lives they choose within their communities.
                            </p>
                        </div>
                    </div>

                    {/* Values Grid */}
                    <div>
                        <h3 className="mb-8 text-center font-heading text-2xl font-bold text-gray-900">Our Values</h3>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {values.map((value) => (
                                <div
                                    key={value.title}
                                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                                        <value.icon className="size-6 text-brand-600" />
                                    </div>
                                    <h3 className="mb-2 font-bold text-gray-900">{value.title}</h3>
                                    <p className="text-sm leading-relaxed text-gray-600">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Leadership profile ───────────────────────────────────────── */}
            <section className="bg-white py-20 lg:py-28">
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



            {/* ── What we offer ────────────────────────────────────────────── */}
            <section className="bg-gradient-to-br from-gray-50 to-white py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        <div className="order-2 lg:order-1">
                            <ul className="space-y-5">
                                {[
                                    'Brain & Spinal Care: Acquired and Traumatic Brain Injury, Spinal Cord Injury',
                                    'Clinical Interventions: Tracheostomy Care & Management, PEG Feeding & Enteral Nutrition, Ventilator Support & Airway Management',
                                    'Neurological & Physical Conditions: Cerebral Palsy, Stroke Rehabilitation & Recovery, Progressive & Degenerative Conditions',
                                    'Complex Health & Behavioural Support: Epilepsy & Seizure Management, Learning Disabilities with Associated Health Needs, Mental Health & Behavioural Support',
                                    'Flexible Support Options: 1:1, 2:1 nurse-led packages, 24-hour & waking night support, HCA-led packages with clinical oversight',
                                    'Enhanced Staffing: Nurse-supported & step-down services, community-based & supported living services, hospital discharge & emergency cover',
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600">
                                            <CheckCircle className="size-3.5 text-white" />
                                        </div>
                                        <span className="text-base leading-relaxed text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="order-1 space-y-6 lg:order-2">
                            <div>
                                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
                                    What We Offer
                                </p>
                                <h2 className="mb-5 font-heading text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl">
                                    Comprehensive care and healthcare workforce solutions
                                </h2>
                                <p className="mb-6 text-lg leading-relaxed text-gray-600">
                                    We are currently accepting new care packages and are committed to supporting commissioners, local authorities, and families with flexible, nurse-led solutions that prioritize safety, independence, and person-centred care.
                                </p>
                                <Button asChild className="bg-brand-600 text-white hover:bg-brand-700">
                                    <Link href="/contact">
                                        Get in Touch <ArrowRight className="ml-2 size-4" />
                                    </Link>
                                </Button>
                            </div>
                            {/* Professional healthcare team image */}
                            <div className="overflow-hidden rounded-2xl shadow-lg">
                                <img 
                                    src="https://images.pexels.com/photos/7551608/pexels-photo-7551608.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" 
                                    alt="Caring healthcare professional supporting elderly person at home with dignity and compassion"
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                            </div>
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
            <section className="bg-gradient-to-br from-brand-700 to-brand-600 py-16 text-white lg:py-20">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-4 font-heading text-3xl font-extrabold lg:text-4xl">Work with MMAB Consulting & Healthcare</h2>
                    <p className="mb-8 text-lg text-brand-50">
                        We are currently accepting new care packages and are ready to support commissioners, local authorities, and families. Contact us to discuss a referral or learn more about our services.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg" className="bg-white font-semibold text-brand-700 hover:bg-brand-50">
                            <Link href="/contact">Refer a Package</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-2 border-white/50 text-white hover:bg-white/10">
                            <Link href="/training">Browse Training</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
