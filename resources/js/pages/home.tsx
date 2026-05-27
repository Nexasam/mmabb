import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Award,
    BookOpen,
    Brain,
    CheckCircle,
    ClipboardList,
    GraduationCap,
    Heart,
    HeartPulse,
    MapPin,
    Phone,
    ShieldCheck,
    Stethoscope,
    Users,
} from 'lucide-react';
import { CTASection } from '@/components/landing/cta-section';
import { HeroSection } from '@/components/landing/hero-section';
import { LeadForm } from '@/components/landing/lead-form';
import { ServiceCard } from '@/components/landing/service-card';
import { TestimonialCard } from '@/components/landing/testimonial-card';
import { VideoSection } from '@/components/landing/video-section';
import { Button } from '@/components/ui/button';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const defaultServices = [
    { icon: 'HeartPulse',   title: 'Paediatric Complex Care',  description: 'Specialist training for professionals supporting children with complex, long-term health conditions requiring nurse-led, multi-disciplinary care.',   href: '/courses/paediatric-complex-care-3-day' },
    { icon: 'Brain',        title: 'Neurological Conditions',  description: 'Comprehensive modules covering acquired brain injury, epilepsy management, and neurological assessment in paediatric settings.',                    href: '/courses' },
    { icon: 'Stethoscope',  title: 'Respiratory & Airway',     description: 'Hands-on training in tracheostomy care, ventilator management, and emergency airway protocols for complex care environments.',                     href: '/courses' },
    { icon: 'ClipboardList',title: 'Enteral Feeding',          description: 'Evidence-based training in NG, NJ, and gastrostomy management, including troubleshooting and family education.',                                   href: '/courses' },
    { icon: 'Users',        title: 'Family-Centred Care',      description: 'Developing skills to work in genuine partnership with families, carers, and multidisciplinary teams around the child.',                            href: '/courses' },
    { icon: 'ShieldCheck',  title: 'Safeguarding',             description: 'Recognising and responding to safeguarding concerns specific to children with complex health needs and disabilities.',                              href: '/courses' },
];

const iconMap: Record<string, React.ElementType> = {
    HeartPulse, Brain, Stethoscope, ClipboardList, Users, ShieldCheck,
    GraduationCap, Award, BookOpen, Heart, CheckCircle,
};

const defaultWhyPoints = [
    { title: 'Nurse-Led Curriculum',    description: 'Every programme is designed and delivered by experienced paediatric complex care nurses.' },
    { title: 'CPD Accredited',          description: '21 hours of accredited CPD per programme, recognised nationally across the UK.' },
    { title: 'Regulatory Compliance',   description: 'Content aligned with CQC standards, NMC guidelines, and current national frameworks.' },
    { title: 'Personalised Support',    description: 'Small group sizes and dedicated facilitators ensure every learner gets the attention they need.' },
    { title: 'Proven Outcomes',         description: 'Measurable competency improvements tracked through pre- and post-course assessments.' },
    { title: 'Comprehensive Resources', description: 'Full digital course materials, reference guides, and post-course access to learning resources.' },
];

const defaultTestimonials = [
    { quote: 'The 3-day course completely transformed how I approach complex care. The clinical scenarios were incredibly realistic and the facilitators were outstanding. I left feeling genuinely confident.', name: 'Sarah Mitchell',  role: 'Paediatric Community Nurse, NHS Trust',          rating: 5 },
    { quote: 'I have attended many CPD courses over my career, but MMAB stands out for the quality of content and the practical focus. The safeguarding module alone was worth the entire programme.',         name: 'James Okafor',    role: 'Complex Care Coordinator, Independent Provider', rating: 5 },
    { quote: 'Our whole team attended and the impact on our practice has been immediate. The family-centred care sessions gave us a shared language that has genuinely improved our relationships with families.', name: 'Dr. Priya Sharma', role: 'Clinical Lead, Paediatric Complex Care',          rating: 5 },
];

const defaultCases = [
    { tag: 'Clinical Impact',          title: 'Improving tracheostomy safety across a community team',    story: 'A community nursing team of 14 attended the respiratory module following a series of near-miss incidents. Post-training audit showed a 94% improvement in protocol adherence and zero incidents in the 6 months following.', outcome: '94% improvement in protocol adherence' },
    { tag: 'Professional Development', title: 'Building confidence in newly qualified nurses',            story: 'A cohort of newly qualified nurses reported significant anxiety around complex care placements. Following the 3-day programme, 100% reported feeling "confident" or "very confident" in their clinical decision-making.',     outcome: '100% reported increased confidence'   },
    { tag: 'Organisational Training',  title: 'Upskilling an entire independent care provider',          story: 'An independent complex care provider commissioned bespoke training for 40 staff across three cohorts. CQC inspection following the programme noted "outstanding" practice in staff knowledge and family engagement.',         outcome: 'CQC "Outstanding" rating achieved'    },
];

const processSteps = [
    { number: '01', icon: ClipboardList, title: 'Initial Assessment', description: 'We discuss your learning needs, professional background, and goals to ensure the right programme for you.' },
    { number: '02', icon: BookOpen,      title: 'Course Planning',    description: 'We confirm your place, send pre-course materials, and prepare your personalised learning pathway.' },
    { number: '03', icon: Users,         title: 'Training Delivery',  description: 'Attend your 3-day programme with expert facilitators, practical simulations, and peer learning.' },
    { number: '04', icon: Award,         title: 'Ongoing Support',    description: 'Receive your CPD certificate, access digital resources, and benefit from post-course clinical support.' },
];

type Cms = Record<string, string>;

function parseJson<T>(raw: string | undefined, fallback: T): T {
    if (!raw) return fallback;
    try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export default function Home({ cms = {} }: { cms?: Cms }) {
    const heroHeadline   = cms['hero.headline']   ?? "Specialist Care\nAnd Support";
    const heroSubtext    = cms['hero.subtext']    ?? 'With over 10 years of experience, we provide specialist clinical training to healthcare professionals supporting children and young people with complex care needs, learning disabilities, and neurological conditions across the UK.';
    const heroCtaLabel   = cms['hero.cta_label']  ?? 'Find out more';
    const heroCtaHref    = cms['hero.cta_href']   ?? '/courses';
    const heroYoutubeId  = cms['hero.youtube_id'] ?? 'dQw4w9WgXcQ';

    const statsItems     = parseJson<{ value: string; label: string }[]>(cms['stats'], [
        { value: '500+', label: 'Professionals Trained' }, { value: '3-Day', label: 'Intensive Programme' },
        { value: '21 hrs', label: 'CPD Accredited' },      { value: 'UK-Wide', label: 'Delivery' },
    ]);

    const servicesBadge    = cms['services.badge']    ?? 'What We Cover';
    const servicesHeadline = cms['services.headline'] ?? 'Specialist training across all areas of complex care';
    const servicesSubtext  = cms['services.subtext']  ?? 'Our programmes cover the full spectrum of paediatric complex care, from clinical skills to safeguarding and family-centred practice.';
    const servicesItems    = parseJson<{ icon?: string; title: string; description: string; href: string }[]>(cms['services.items'], defaultServices);

    const whyHeadline = cms['why.headline'] ?? 'The MMAB Consulting Difference';
    const whySubtext  = cms['why.subtext']  ?? 'We are a specialist healthcare training consultancy with a single focus: equipping professionals to deliver outstanding care to children with complex needs.';
    const whyPoints   = parseJson<{ title: string; description: string }[]>(cms['why.points'], defaultWhyPoints);

    const testimonialsHeadline = cms['testimonials.headline'] ?? 'What healthcare professionals say';
    const testimonialsItems    = parseJson<{ quote: string; name: string; role: string; rating: number }[]>(cms['testimonials.items'], defaultTestimonials);

    const videoTitle    = cms['video.title']    ?? 'See how we make a difference';
    const videoSubtitle = cms['video.subtitle'] ?? 'Watch how MMAB Consulting is transforming paediatric complex care training across the UK.';

    const casesHeadline = cms['cases.headline'] ?? "How we've helped professionals and teams";
    const casesItems    = parseJson<{ tag: string; title: string; story: string; outcome: string }[]>(cms['cases.items'], defaultCases);

    const aboutHeadline = cms['about.headline'] ?? 'Specialists in paediatric complex care education';
    const aboutBody1    = cms['about.body1']    ?? 'MMAB Consulting is a specialist healthcare training consultancy founded by experienced paediatric complex care clinicians. With over a decade of combined NHS and independent sector experience, our team brings unparalleled clinical depth to every programme.';
    const aboutBody2    = cms['about.body2']    ?? 'We deliver training nationwide, working with NHS trusts, independent care providers, and individual healthcare professionals across the UK.';
    const aboutStats    = parseJson<{ value: string; label: string }[]>(cms['about.stats'], [
        { value: '10+', label: 'Years Experience' }, { value: '500+', label: 'Professionals Trained' },
        { value: 'UK-Wide', label: 'Nationwide Delivery' }, { value: 'CPD', label: 'Accredited Courses' },
    ]);

    const ctaHeadline = cms['cta.headline'] ?? 'Your journey to better care starts here';
    const ctaSubtext  = cms['cta.subtext']  ?? 'Speak to our specialist team today and take the first step towards advancing your clinical practice and improving outcomes for the children in your care.';

    const contactHeadline = cms['contact.headline'] ?? 'Get in touch with our team';
    const contactSubtext  = cms['contact.subtext']  ?? "Whether you're an individual professional or looking to arrange training for your organisation, we're here to help. Fill in the form and we'll be in touch within 24 hours.";

    const sitePhone = cms['site.phone'] ?? '+44 (0) 000 000 0000';

    return (
        <>
            <Head title="Specialist Paediatric Complex Care Training | MMAB Consulting" />

            {/* ── 1. HERO ── */}
            <HeroSection
                headline={heroHeadline}
                subtext={heroSubtext}
                ctaLabel={heroCtaLabel}
                ctaHref={heroCtaHref}
                youtubeId={heroYoutubeId}
            />

            {/* ── STATS BAR ── */}
            <div className="border-b border-gray-100 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 divide-x divide-gray-100 md:grid-cols-4">
                        {statsItems.map((stat, i) => (
                            <motion.div key={stat.label} {...fadeUp(i * 0.08)} className="py-6 text-center">
                                <div className="font-heading text-2xl font-extrabold text-brand-700">{stat.value}</div>
                                <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── 2. SERVICES ── */}
            <section className="relative overflow-hidden py-24" aria-labelledby="services-heading">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-brand-50/30 to-white" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()} className="mb-16 text-center">
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-600">
                            {servicesBadge}
                        </span>
                        <h2 id="services-heading" className="mb-4 font-heading text-3xl font-extrabold text-gray-900 lg:text-4xl xl:text-5xl">
                            {servicesHeadline}
                        </h2>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-500">{servicesSubtext}</p>
                    </motion.div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {servicesItems.map((service, i) => {
                            const Icon = iconMap[service.icon ?? ''] ?? HeartPulse;
                            return <ServiceCard key={service.title} icon={Icon} title={service.title} description={service.description} href={service.href} index={i} featured={i === 0} />;
                        })}
                    </div>
                    <motion.div {...fadeUp(0.2)} className="mt-14 flex flex-col items-center gap-3">
                        <Link href="/courses" className="group inline-flex items-center gap-2.5 rounded-2xl bg-brand-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-300/30 transition-all duration-200 hover:bg-brand-700 active:scale-95">
                            View All Courses
                            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                        </Link>
                        <p className="text-xs text-gray-400">CPD accredited · Nurse-led · UK-wide delivery</p>
                    </motion.div>
                </div>
            </section>

            {/* ── 3. WHY CHOOSE US ── */}
            <section className="bg-gray-50 py-24" aria-labelledby="difference-heading">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <motion.div {...fadeUp()}>
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">Why Choose Us</p>
                            <h2 id="difference-heading" className="mb-5 font-heading text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl">
                                {whyHeadline}
                            </h2>
                            <p className="mb-6 text-base leading-relaxed text-gray-600">{whySubtext}</p>
                            <Button asChild className="group bg-brand-600 font-semibold text-white hover:bg-brand-700 active:scale-95 transition-all duration-200">
                                <Link href="/about">About MMAB <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" /></Link>
                            </Button>
                        </motion.div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {whyPoints.map((point, i) => (
                                <motion.div key={point.title} {...fadeUp(i * 0.07)} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                                        <CheckCircle className="size-5 text-brand-600" />
                                    </div>
                                    <div>
                                        <div className="mb-0.5 text-sm font-bold text-gray-900">{point.title}</div>
                                        <div className="text-xs leading-relaxed text-gray-500">{point.description}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. TESTIMONIALS ── */}
            <section className="py-24" aria-labelledby="testimonials-heading">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()} className="mb-14 text-center">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">Social Proof</p>
                        <h2 id="testimonials-heading" className="font-heading text-3xl font-extrabold text-gray-900 lg:text-4xl">
                            {testimonialsHeadline}
                        </h2>
                    </motion.div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonialsItems.map((t, i) => (
                            <TestimonialCard key={t.name} {...t} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. VIDEO ── */}
            <VideoSection src="/videos/difference.mp4" title={videoTitle} subtitle={videoSubtitle} />

            {/* ── 6. CASE STUDIES ── */}
            <section className="py-24" aria-labelledby="case-studies-heading">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()} className="mb-14 text-center">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">Real-World Impact</p>
                        <h2 id="case-studies-heading" className="font-heading text-3xl font-extrabold text-gray-900 lg:text-4xl">
                            {casesHeadline}
                        </h2>
                    </motion.div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {casesItems.map((cs, i) => (
                            <motion.div key={cs.title} {...fadeUp(i * 0.1)} className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                <div className="border-b border-gray-50 bg-gray-50/50 px-6 py-3">
                                    <span className="inline-block rounded-full bg-brand-50 px-3 py-0.5 text-xs font-semibold text-brand-700">{cs.tag}</span>
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <h3 className="mb-3 font-heading text-base font-bold leading-snug text-gray-900">{cs.title}</h3>
                                    <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-500">{cs.story}</p>
                                    <div className="flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3">
                                        <CheckCircle className="size-4 shrink-0 text-brand-600" />
                                        <span className="text-xs font-semibold text-brand-800">{cs.outcome}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 7. ABOUT ── */}
            <section className="bg-gray-50 py-24" aria-labelledby="about-heading">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 shadow-2xl lg:flex">
                        <motion.div {...fadeUp()} className="flex flex-col justify-center p-10 text-white lg:w-3/5 lg:p-14">
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-200">About MMAB Consulting</p>
                            <h2 id="about-heading" className="mb-4 font-heading text-3xl font-extrabold leading-tight lg:text-4xl">{aboutHeadline}</h2>
                            <p className="mb-4 leading-relaxed text-brand-100">{aboutBody1}</p>
                            <p className="mb-6 leading-relaxed text-brand-100">{aboutBody2}</p>
                            <div className="flex flex-wrap gap-3">
                                <Button asChild className="group bg-white font-semibold text-brand-700 hover:bg-brand-50 active:scale-95 transition-all duration-200">
                                    <Link href="/about">Our Story</Link>
                                </Button>
                                <Button asChild variant="ghost" className="group text-brand-100 hover:bg-white/10 hover:text-white">
                                    <Link href="/contact"><Phone className="mr-1.5 size-4" /> Contact Us</Link>
                                </Button>
                            </div>
                        </motion.div>
                        <div className="grid grid-cols-2 gap-px bg-brand-600/30 lg:w-2/5">
                            {aboutStats.map((stat) => (
                                <div key={stat.label} className="flex flex-col items-center justify-center bg-brand-800/40 p-8 text-center text-white">
                                    <div className="font-heading text-3xl font-extrabold text-brand-200">{stat.value}</div>
                                    <div className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-300">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 8. PROCESS ── */}
            <section className="py-24" aria-labelledby="process-heading">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()} className="mb-16 text-center">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">How It Works</p>
                        <h2 id="process-heading" className="font-heading text-3xl font-extrabold text-gray-900 lg:text-4xl">Your journey to better practice</h2>
                    </motion.div>
                    <div className="relative">
                        <div aria-hidden className="absolute top-10 left-[12.5%] hidden h-0.5 w-3/4 bg-gradient-to-r from-brand-100 via-brand-300 to-brand-100 lg:block" />
                        <div className="grid gap-10 lg:grid-cols-4">
                            {processSteps.map((step, i) => (
                                <motion.div key={step.number} {...fadeUp(i * 0.1)} className="relative flex flex-col items-center text-center">
                                    <div className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-200">
                                        <step.icon className="size-8 text-white" aria-hidden />
                                        <div aria-hidden className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-900 text-[10px] font-bold text-white">{step.number}</div>
                                    </div>
                                    <h3 className="mb-2 font-heading font-bold text-gray-900">{step.title}</h3>
                                    <p className="text-sm leading-relaxed text-gray-500">{step.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <motion.div {...fadeUp(0.3)} className="mt-14 text-center">
                        <Button asChild size="lg" className="group bg-brand-600 font-semibold text-white shadow-lg hover:bg-brand-700 active:scale-95 transition-all duration-200">
                            <Link href="/courses/paediatric-complex-care-3-day/apply">
                                Start Your Journey
                                <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* ── 9. CTA BANNER ── */}
            <CTASection headline={ctaHeadline} subtext={ctaSubtext} />

            {/* ── 10. CONTACT FORM ── */}
            <section className="py-24" aria-labelledby="contact-form-heading">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <motion.div {...fadeUp()}>
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">Free Consultation</p>
                            <h2 id="contact-form-heading" className="mb-4 font-heading text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl">
                                {contactHeadline}
                            </h2>
                            <p className="mb-6 text-base leading-relaxed text-gray-600">{contactSubtext}</p>
                            <ul className="mb-8 space-y-3">
                                {['No obligation — just a conversation', 'Tailored advice for your specific needs', 'Flexible scheduling across UK venues', 'Group and individual bookings available'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100">
                                            <CheckCircle className="size-3 text-brand-600" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-600 shadow-md">
                                    <Phone className="size-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400">Prefer to call?</div>
                                    <a href={`tel:${sitePhone.replace(/\s/g, '')}`} className="text-sm font-bold text-gray-900 transition-colors hover:text-brand-700">{sitePhone}</a>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div {...fadeUp(0.15)} className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
                            <h3 className="mb-6 font-heading text-lg font-bold text-gray-900">Request a Free Consultation</h3>
                            <LeadForm />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── TRUST STRIP ── */}
            <div className="border-t border-gray-100 bg-gray-50 py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5"><MapPin className="size-4 text-brand-500" aria-hidden />Nationwide UK Delivery</span>
                        <span aria-hidden className="h-4 w-px bg-gray-200" />
                        <span className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-brand-500" aria-hidden />CPD Accredited Programmes</span>
                        <span aria-hidden className="h-4 w-px bg-gray-200" />
                        <span className="flex items-center gap-1.5"><Award className="size-4 text-brand-500" aria-hidden />Nurse-Led Training</span>
                    </div>
                </div>
            </div>
        </>
    );
}
