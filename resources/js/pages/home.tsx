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
    { icon: 'HeartPulse',    title: 'Complex & Clinical Care',      description: 'Nurse-led care for tracheostomy, home ventilation, enteral feeding (PEG/J, NGT/J), seizure management, and a wide range of neurological conditions — delivered safely at home.',    href: '/contact' },
    { icon: 'Brain',         title: 'Mental Health & LD Support',   description: 'Specialist support for adults and young people with mental health conditions, learning disabilities, and autism — tailored to individual needs and delivered in the community.',      href: '/contact' },
    { icon: 'Users',         title: 'Domiciliary & Respite Care',   description: 'Flexible domiciliary and respite care for adults and young people, enabling independence and giving families the breaks they need.',                                                href: '/contact' },
    { icon: 'Stethoscope',   title: 'Clinical Training',            description: 'CPD-accredited complex care training and educational support for healthcare professionals, covering clinical skills, compliance, and best practice.',                                 href: '/courses' },
    { icon: 'ClipboardList', title: 'Business Consultancy',         description: 'Clinical business consultancy to help care providers improve quality, meet CQC standards, and strengthen their governance and compliance frameworks.',                                href: '/contact' },
    { icon: 'ShieldCheck',   title: 'ICB & NHS Partnerships',       description: 'We work directly with ICBs, NHS teams, and local authorities to accept new packages quickly, with nurse-led oversight and a strong focus on safety and person-centred outcomes.',   href: '/contact' },
];

const iconMap: Record<string, React.ElementType> = {
    HeartPulse, Brain, Stethoscope, ClipboardList, Users, ShieldCheck,
    GraduationCap, Award, BookOpen, Heart, CheckCircle,
};

const defaultWhyPoints = [
    { title: 'CQC-Rated GOOD',           description: 'Our most recent CQC inspection rated us GOOD, reflecting our commitment to safe, effective, and person-centred care.' },
    { title: 'Nurse-Led',                 description: 'All our services are clinically led by experienced nurses, ensuring the highest standards of care and oversight.' },
    { title: 'Complex Care Specialists',  description: 'We are leaders in complex and clinical home care, supporting service users with the most challenging and high-acuity needs.' },
    { title: 'CPD-Accredited Training',   description: 'Our training arm delivers CPD-accredited programmes and educational support to healthcare professionals and organisations.' },
    { title: 'Flexible Packages',         description: 'We accept new packages quickly and can tailor services to the needs of ICBs, NHS teams, local authorities, and individual families.' },
    { title: 'Values-Driven Leadership',  description: 'Our management team leads by example with a strong focus on values, staff support, and continuous improvement.' },
];

const defaultTestimonials = [
    { quote: 'MMAB Home Care stepped in at short notice to support one of our most complex packages. The nurse-led team handled everything professionally and the family felt genuinely supported throughout.', name: 'NHS Complex Care Manager',  role: 'Integrated Care Board',          rating: 5 },
    { quote: 'The clinical knowledge of the MMAB team is outstanding. They manage tracheostomy and ventilator care at home to a standard I rarely see from independent providers. I have no hesitation referring packages to them.',         name: 'Community Nursing Lead',    role: 'NHS Trust', rating: 5 },
    { quote: 'The CPD training we received from MMAB transformed how our team approaches complex care. It was practical, clinically rigorous, and immediately applicable to our day-to-day work.', name: 'Registered Manager', role: 'Independent Care Provider',          rating: 5 },
];

const defaultCases = [
    { tag: 'Complex Care',        title: 'Home ventilation and tracheostomy care for a young adult',  story: 'An ICB referred a young adult with complex respiratory needs following a prolonged hospital admission. Our nurse-led team established a safe care package within 72 hours, enabling discharge and supporting the individual to return to their family home.',       outcome: 'Successful discharge within 72 hours'  },
    { tag: 'Mental Health & LD',  title: 'Supporting transition for a young person with autism',      story: 'A local authority commissioned MMAB to support a young person with autism and complex behaviours through a transition from residential care. Our team delivered person-centred community support, resulting in a stable placement and improved wellbeing.',   outcome: 'Stable community placement achieved'   },
    { tag: 'Clinical Training',   title: 'Upskilling a care team in complex clinical procedures',     story: 'An independent provider commissioned bespoke CPD-accredited training for their staff covering enteral feeding, seizure management, and respiratory care. Post-training assessment confirmed significant improvements in clinical competency across the team.',  outcome: 'Measurable competency improvement'      },
];

const processSteps = [
    { number: '01', icon: ClipboardList, title: 'Get in Touch',        description: 'Contact our team to discuss a referral, new package, or enquiry. We respond within 24 hours.' },
    { number: '02', icon: BookOpen,      title: 'Needs Assessment',    description: 'We carry out a thorough assessment to understand the individual\'s care needs and agree a tailored care plan.' },
    { number: '03', icon: Users,         title: 'Care Mobilisation',   description: 'Our nurse-led team mobilises quickly, recruiting and matching the right staff to deliver safe, consistent care.' },
    { number: '04', icon: Award,         title: 'Ongoing Oversight',   description: 'Regular clinical reviews, quality monitoring, and open communication ensure care remains outstanding.' },
];

type Cms = Record<string, string>;

function parseJson<T>(raw: string | undefined, fallback: T): T {
    if (!raw) return fallback;
    try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export default function Home({ cms = {} }: { cms?: Cms }) {
    const heroHeadline   = cms['hero.headline']   ?? "Specialist Care\nFor Every Need";
    const heroSubtext    = cms['hero.subtext']    ?? 'MMAB Home Care is a CQC-rated GOOD, nurse-led provider serving North and South East England. We deliver complex clinical care, mental health and LD support, and domiciliary care to adults and young people in the comfort of their own homes — in partnership with ICBs, NHS teams, and local authorities.';
    const heroCtaLabel   = cms['hero.cta_label']  ?? 'Refer a package';
    const heroCtaHref    = cms['hero.cta_href']   ?? '/contact';
    const heroYoutubeId  = cms['hero.youtube_id'] ?? 'dQw4w9WgXcQ';

    const statsItems     = parseJson<{ value: string; label: string }[]>(cms['stats'], [
        { value: 'GOOD',       label: 'CQC Rating' }, { value: 'Nurse-Led', label: 'Clinical Leadership' },
        { value: 'CPD',        label: 'Accredited Training' }, { value: 'NE England', label: 'North & South East' },
    ]);

    const servicesBadge    = cms['services.badge']    ?? 'What We Provide';
    const servicesHeadline = cms['services.headline'] ?? 'Comprehensive nurse-led care across every need';
    const servicesSubtext  = cms['services.subtext']  ?? 'From complex clinical care at home to mental health support and CPD-accredited training, we deliver flexible, high-quality services to individuals, families, and healthcare organisations.';
    const servicesItems    = parseJson<{ icon?: string; title: string; description: string; href: string }[]>(cms['services.items'], defaultServices);

    const whyHeadline = cms['why.headline'] ?? 'The MMAB Home Care Difference';
    const whySubtext  = cms['why.subtext']  ?? 'We are a CQC-rated GOOD, nurse-led provider with deep expertise in complex and clinical care. Our Operations Director brings a wide range of industry experience, and our CQC report noted: "Management led by example, with a strong focus on values and staff support."';
    const whyPoints   = parseJson<{ title: string; description: string }[]>(cms['why.points'], defaultWhyPoints);

    const testimonialsHeadline = cms['testimonials.headline'] ?? 'What commissioners and families say';
    const testimonialsItems    = parseJson<{ quote: string; name: string; role: string; rating: number }[]>(cms['testimonials.items'], defaultTestimonials);

    const videoTitle    = cms['video.title']    ?? 'See how we make a difference';
    const videoSubtitle = cms['video.subtitle'] ?? 'Watch how MMAB Home Care is delivering outstanding nurse-led care and training across the UK.';

    const casesHeadline = cms['cases.headline'] ?? "How we've supported commissioners and families";
    const casesItems    = parseJson<{ tag: string; title: string; story: string; outcome: string }[]>(cms['cases.items'], defaultCases);

    const aboutHeadline = cms['about.headline'] ?? 'CQC-rated GOOD. Nurse-led. Person-centred.';
    const aboutBody1    = cms['about.body1']    ?? 'MMAB Home Care is a nurse-led provider rated GOOD by the CQC, serving North and South East England. We specialise in complex and clinical care for adults and young people, as well as mental health, learning disability, and autism support — all delivered in the home and community setting.';
    const aboutBody2    = cms['about.body2']    ?? 'Led by Rosemary Lanlehin, a nurse with over 30 years of clinical, academic, and complex care experience — including 20 years as Programme Director at City University London — our team brings exceptional clinical depth to everything we do. We work in close partnership with ICBs, NHS trusts, and local authorities, and deliver CPD-accredited clinical training and business consultancy.';
    const aboutStats    = parseJson<{ value: string; label: string }[]>(cms['about.stats'], [
        { value: 'GOOD',       label: 'CQC Rating' }, { value: 'Nurse-Led', label: 'Clinical Leadership' },
        { value: 'NE England', label: 'Coverage Area' }, { value: 'CPD', label: 'Accredited Training' },
    ]);

    const ctaHeadline = cms['cta.headline'] ?? 'Currently accepting new packages';
    const ctaSubtext  = cms['cta.subtext']  ?? 'We are keen to support your team with flexible, nurse-led care solutions. Get in touch today to discuss a new package or to find out more about our services.';

    const contactHeadline = cms['contact.headline'] ?? 'Refer a package or get in touch';
    const contactSubtext  = cms['contact.subtext']  ?? "Whether you're a commissioner, ICB, local authority, or a family looking for specialist care, we're here to help. Fill in the form and we'll be in touch within 24 hours.";

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
                            Refer a Package
                            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                        </Link>
                        <p className="text-xs text-gray-400">CQC-rated GOOD · Nurse-led · Currently accepting new packages</p>
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
                        <h2 id="process-heading" className="font-heading text-3xl font-extrabold text-gray-900 lg:text-4xl">Referring a package is straightforward</h2>
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
                                Refer a Package
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
                                {['No obligation — just a conversation', 'Nurse-led assessment and care planning', 'Packages accepted across the UK', 'ICB, NHS, local authority and self-funded referrals welcome'].map((item) => (
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
