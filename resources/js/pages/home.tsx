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
    { icon: 'HeartPulse',  title: 'Complex Clinical Care',          description: 'Nurse-led care at home for adults and children with neurological conditions, brain injury, spinal injury, tracheostomy, airway management, PEG feeding, and other complex health needs — enabling people to live safely in their own homes.',   href: '/contact' },
    { icon: 'Brain',       title: 'Learning Disabilities & Autism', description: 'Personalised support for adults and young people with learning disabilities and autism, helping them build confidence, develop life skills, and live independently within their communities.',                                               href: '/contact' },
    { icon: 'Heart',       title: 'Mental Health Support',          description: 'Compassionate, condition-specific care for people living with mental health conditions — with personalised plans focused on emotional wellbeing, stability, and recovery in familiar surroundings.',                                           href: '/contact' },
    { icon: 'Users',       title: 'Domiciliary Care',               description: 'Flexible, person-centred support with daily living — personal care, meal preparation, mobility, household tasks, and community access — built around each person\'s own routines and preferences.',                                           href: '/contact' },
    { icon: 'HeartPulse',  title: 'Respite & End of Life Care',     description: 'Short-term respite to give family carers a well-earned break, and compassionate end of life care that prioritises dignity, comfort, and choice in the place people call home.',                                                               href: '/contact' },
    { icon: 'ShieldCheck', title: 'Commissioner Partnerships',      description: 'We work closely with ICBs, NHS teams, and local authorities across North and South East England — accepting new packages quickly, with full nurse-led clinical oversight.',                                                                   href: '/contact' },
];

const iconMap: Record<string, React.ElementType> = {
    HeartPulse, Brain, Stethoscope, ClipboardList, Users, ShieldCheck,
    GraduationCap, Award, BookOpen, Heart, CheckCircle,
};

const defaultWhyPoints = [
    { title: 'CQC Rated Good',           description: 'Our CQC rating reflects a genuine commitment to safe, effective, and person-centred care — not just on inspection day, but every day.' },
    { title: 'Nurse-Led',                description: 'All care is overseen by experienced nurses. That clinical rigour means better outcomes and safer care for the people we support.' },
    { title: 'Complex Care Specialists', description: 'We support people with the most complex needs at home — tracheostomy, ventilation, brain injury, neurological conditions — so they can stay in their family and community.' },
    { title: 'Person-Centred Always',    description: 'Every care plan is shaped by the individual — what they want, what matters to them, and how they want to live their life.' },
    { title: 'We Move Quickly',          description: 'When someone needs care, waiting isn\'t an option. We work quickly to have safe, high-quality care in place — often within 72 hours of referral.' },
    { title: 'Values-Driven',            description: '"Management led by example, with a strong focus on values and staff support." — CQC Inspection Report.' },
];

const defaultTestimonials = [
    { quote: 'MMAB stepped in at short notice to support one of our most complex packages. The nurse-led team were professional throughout and the family felt truly supported from day one.', name: 'NHS Complex Care Manager',  role: 'Integrated Care Board',   rating: 5 },
    { quote: 'The clinical knowledge of the MMAB team is outstanding. They manage tracheostomy and ventilator care at home to a standard I rarely see from independent providers. I have no hesitation referring packages to them.', name: 'Community Nursing Lead', role: 'NHS Trust', rating: 5 },
    { quote: 'Having MMAB support our family member at home has made an enormous difference. The carers are skilled, consistent, and genuinely caring. We finally feel like we can breathe.', name: 'Family Carer', role: 'North East England', rating: 5 },
];

const defaultCases = [
    { tag: 'Complex Clinical Care',  title: 'Safe home discharge for a young adult requiring ventilation',       story: 'An ICB referred a young adult with complex respiratory needs following a prolonged hospital admission. Our nurse-led team established a safe home care package within 72 hours, enabling discharge and allowing the individual to return to family life.',  outcome: 'Home discharge achieved within 72 hours' },
    { tag: 'Learning Disability',    title: 'Supporting a young person with autism through a complex transition', story: 'A local authority commissioned MMAB to support a young person with autism and complex behaviours through a transition from residential care. Our team provided consistent, person-centred support, resulting in a stable home placement and improved wellbeing.', outcome: 'Stable home placement maintained'         },
    { tag: 'Domiciliary Care',       title: 'Enabling independence for an adult with neurological needs',         story: 'Following a brain injury, a middle-aged adult required daily support to live at home rather than in a residential setting. MMAB built a flexible care package around their goals — supporting independence, community access, and quality of life.',           outcome: 'Residential placement avoided'           },
];

const processSteps = [
    { number: '01', icon: Phone,         title: 'Get in Touch',        description: 'Call us or fill in the form. Tell us about the person who needs care and we\'ll respond within 24 hours.' },
    { number: '02', icon: ClipboardList, title: 'Care Assessment',     description: 'We visit and carry out a thorough assessment to understand the individual\'s needs, preferences, and goals.' },
    { number: '03', icon: Users,         title: 'Care Begins',         description: 'We match the right carers, agree a plan, and mobilise quickly — often within 72 hours for urgent packages.' },
    { number: '04', icon: Award,         title: 'Ongoing Support',     description: 'Regular reviews, open communication, and nurse-led oversight ensure care stays safe and truly person-centred.' },
];

type Cms = Record<string, string>;

function parseJson<T>(raw: string | undefined, fallback: T): T {
    if (!raw) return fallback;
    try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export default function Home({ cms = {} }: { cms?: Cms }) {
    const heroHeadline   = cms['hero.headline']   ?? "Specialist Care\nAt Home";
    const heroSubtext    = cms['hero.subtext']    ?? 'MMAB Home Care is a CQC-rated Good, nurse-led provider serving North and South East England. We deliver complex clinical care, learning disability and autism support, mental health care, and domiciliary services — so people can live well in the comfort of their own homes.';
    const heroCtaLabel   = cms['hero.cta_label']  ?? 'Enquire About Care';
    const heroCtaHref    = cms['hero.cta_href']   ?? '/contact';
    const heroYoutubeId  = cms['hero.youtube_id'] ?? 'dQw4w9WgXcQ';

    const statsItems     = parseJson<{ value: string; label: string }[]>(cms['stats'], [
        { value: 'Good',       label: 'CQC Rating'        },
        { value: 'Nurse-Led',  label: 'Clinical Leadership'},
        { value: '30+',        label: 'Years Experience'  },
        { value: 'NE England', label: 'Coverage Area'     },
    ]);

    const servicesBadge    = cms['services.badge']    ?? 'Our Care Services';
    const servicesHeadline = cms['services.headline'] ?? 'Specialist care at home, for every need';
    const servicesSubtext  = cms['services.subtext']  ?? 'We provide high-quality, nurse-led care to adults and young people across North and South East England — enabling people to live safely and independently in their own homes.';
    const servicesItems    = parseJson<{ icon?: string; title: string; description: string; href: string }[]>(cms['services.items'], defaultServices);

    const whyHeadline = cms['why.headline'] ?? 'Why families and commissioners choose MMAB';
    const whySubtext  = cms['why.subtext']  ?? 'CQC-rated Good and nurse-led, we bring clinical depth, genuine compassion, and a commitment to getting care right for every person we support. Our recent CQC report noted: "Management led by example, with a strong focus on values and staff support."';
    const whyPoints   = parseJson<{ title: string; description: string }[]>(cms['why.points'], defaultWhyPoints);

    const testimonialsHeadline = cms['testimonials.headline'] ?? 'What commissioners and families say';
    const testimonialsItems    = parseJson<{ quote: string; name: string; role: string; rating: number }[]>(cms['testimonials.items'], defaultTestimonials);

    const videoTitle    = cms['video.title']    ?? 'Care that makes a real difference';
    const videoSubtitle = cms['video.subtitle'] ?? 'See how MMAB Home Care supports adults and young people to live safely and independently in North and South East England.';

    const casesHeadline = cms['cases.headline'] ?? 'Real people. Real outcomes.';
    const casesItems    = parseJson<{ tag: string; title: string; story: string; outcome: string }[]>(cms['cases.items'], defaultCases);

    const aboutHeadline = cms['about.headline'] ?? 'Trusted care, close to home.';
    const aboutBody1    = cms['about.body1']    ?? 'MMAB Home Care is a nurse-led provider rated Good by the CQC, serving North and South East England. We support adults and young people with complex clinical needs, learning disabilities, autism, mental health conditions, and everyday care needs — so they can live well in the place they call home.';
    const aboutBody2    = cms['about.body2']    ?? 'Led by Rosemary Lanlehin — a registered nurse with over 30 years of clinical and academic experience — our team brings exceptional depth to every care package. We work closely with ICBs, NHS teams, and local authorities, and we are currently accepting new packages.';
    const aboutStats    = parseJson<{ value: string; label: string }[]>(cms['about.stats'], [
        { value: 'Good',       label: 'CQC Rating'          },
        { value: 'Nurse-Led',  label: 'Clinical Leadership'  },
        { value: '30+',        label: 'Years Experience'     },
        { value: 'NE England', label: 'Coverage Area'        },
    ]);

    const ctaHeadline = cms['cta.headline'] ?? 'Currently accepting new care packages';
    const ctaSubtext  = cms['cta.subtext']  ?? 'We are keen to support your team or your family with flexible, nurse-led care. Get in touch to discuss a referral — we respond within 24 hours.';

    const contactHeadline = cms['contact.headline'] ?? 'Talk to us about care';
    const contactSubtext  = cms['contact.subtext']  ?? "Whether you're a commissioner, ICB, local authority, or a family looking for specialist care at home — we're here to help. Fill in the form and we'll be in touch within 24 hours.";

    const sitePhone = cms['site.phone'] ?? '+44 (0) 000 000 0000';

    return (
        <>
            <Head title="Nurse-Led Home Care | CQC-Rated GOOD | MMAB Home Care" />

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
                        <Link href="/contact" className="group inline-flex items-center gap-2.5 rounded-2xl bg-brand-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-300/30 transition-all duration-200 hover:bg-brand-700 active:scale-95">
                            Enquire About Care
                            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                        </Link>
                        <p className="text-xs text-gray-400">CQC Rated Good · Nurse-led · North &amp; South East England · <Link href="/courses" className="underline underline-offset-2 hover:text-gray-600">Clinical training also available</Link></p>                    </motion.div>
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
                                <Link href="/about">About MMAB Home Care <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" /></Link>
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
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">Families &amp; Commissioners</p>
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
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">People We've Supported</p>
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
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-200">About MMAB Home Care</p>
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
                        <h2 id="process-heading" className="font-heading text-3xl font-extrabold text-gray-900 lg:text-4xl">Getting care in place is simple</h2>
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
                            <Link href="/contact">
                                Enquire About Care
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
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">Enquire About Care</p>
                            <h2 id="contact-form-heading" className="mb-4 font-heading text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl">
                                {contactHeadline}
                            </h2>
                            <p className="mb-6 text-base leading-relaxed text-gray-600">{contactSubtext}</p>
                            <ul className="mb-8 space-y-3">
                                {[
                                    'No obligation — just a conversation',
                                    'Nurse-led assessment and personalised care planning',
                                    'ICB, NHS, local authority and self-funded referrals welcome',
                                    'Care packages available across North and South East England',
                                ].map((item) => (
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
                                    <a href="tel:01913804370" className="text-sm font-bold text-gray-900 transition-colors hover:text-brand-700">0191 380 4370</a>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div {...fadeUp(0.15)} className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
                            <h3 className="mb-6 font-heading text-lg font-bold text-gray-900">Talk to Us About Care</h3>
                            <LeadForm />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── TRUST STRIP ── */}
            <div className="border-t border-gray-100 bg-gray-50 py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5"><MapPin className="size-4 text-brand-500" aria-hidden />Meadowfield, Durham</span>
                        <span aria-hidden className="h-4 w-px bg-gray-200" />
                        <span className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-brand-500" aria-hidden />CQC-Rated GOOD</span>
                        <span aria-hidden className="h-4 w-px bg-gray-200" />
                        <span className="flex items-center gap-1.5"><Award className="size-4 text-brand-500" aria-hidden />Nurse-Led Care</span>
                    </div>
                </div>
            </div>
        </>
    );
}
