import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Award,
    BookOpen,
    Brain,
    CheckCircle,
    ClipboardList,
    Clock,
    GraduationCap,
    Heart,
    HeartPulse,
    Lightbulb,
    MapPin,
    Phone,
    Shield,
    ShieldCheck,
    Sparkles,
    Stethoscope,
    Target,
    Users,
    UserCheck,
    type LucideIcon,
} from 'lucide-react';
import { CTASection } from '@/components/landing/cta-section';
import { CqcWidget } from '@/components/cqc-widget';
import { LeadForm } from '@/components/landing/lead-form';
import { ServiceCard } from '@/components/landing/service-card';
import { TestimonialCard } from '@/components/landing/testimonial-card';
import { Button } from '@/components/ui/button';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const defaultServices = [
    { icon: 'HeartPulse',  title: 'Complex Care',          description: 'Specialist nurse-led care for adults and children with complex clinical needs—tracheostomy, ventilation, PEG feeding, neurological conditions, brain and spinal injury. Supporting people to live safely at home.',   href: '/contact' },
    { icon: 'Users',       title: 'Staffing Solutions',   description: 'Highly skilled healthcare professionals available for short-term placements and ongoing packages. Registered nurses, support workers, and clinical specialists with complex care expertise.',                         href: '/contact' },
    { icon: 'ClipboardList', title: 'Recruitment Services', description: 'End-to-end recruitment for healthcare providers. We source, screen, and onboard qualified staff—ensuring compliance, clinical competence, and cultural fit for complex care environments.',                            href: '/contact' },
];

const iconMap: Record<string, LucideIcon> = {
    HeartPulse, Brain, Stethoscope, ClipboardList, Users, ShieldCheck,
    GraduationCap, Award, BookOpen, Heart, CheckCircle, Shield, UserCheck, Target, Sparkles, Lightbulb,
};

const defaultWhyPoints = [
    { title: 'CQC Rated Good',           description: 'Our commitment to safe, effective, and person-centred care has been recognized by the Care Quality Commission.' },
    { title: 'Nurse-Led Excellence',     description: 'All care is overseen by experienced registered nurses, ensuring clinical rigor and better outcomes.' },
    { title: 'Complex Care Specialists', description: 'We support people with the most complex clinical needs—tracheostomy, ventilation, brain injury, neurological conditions—enabling them to stay at home with family and community.' },
    { title: 'Person-Centred Always',    description: 'Every care plan is shaped around what the individual wants and how they want to live their life.' },
    { title: 'Rapid Mobilisation',       description: 'When someone needs care, we move quickly—often establishing safe, high-quality care within 72 hours.' },
    { title: 'Values-Driven Team',       description: 'Our leadership leads by example, with a strong focus on compassion, professionalism, and staff support.' },
];

const defaultTestimonials = [
    { quote: 'MMAB stepped in at short notice to support one of our most complex packages. The nurse-led team were professional throughout and the family felt truly supported from day one.', name: 'NHS Complex Care Manager',  role: 'Integrated Care Board',   rating: 5 },
    { quote: 'The clinical knowledge of the MMAB team is outstanding. They manage tracheostomy and ventilator care at home to a standard I rarely see from independent providers. I have no hesitation referring packages to them.', name: 'Community Nursing Lead', role: 'NHS Trust', rating: 5 },
    { quote: 'Thank you for a lovely few days training, I can honestly say it was the best training I\'ve been on for years. The depth of clinical knowledge and practical hands-on approach made all the difference.', name: 'Steph', role: 'Healthcare Professional', rating: 5 },
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
    const heroHeadline   = cms['hero.headline']   ?? "Complex care\nadults and children";
    const heroSubtext    = cms['hero.subtext']    ?? 'MMAB Consulting & Healthcare is a CQC-rated Good, nurse-led provider delivering specialist complex care to adults and children across North and South East England. We provide person-centred care enabling people to live safely and independently in their own homes.';
    const heroCtaLabel   = cms['hero.cta_label']  ?? 'Refer a Package';
    const heroCtaHref    = cms['hero.cta_href']   ?? '/contact';

    const statsItems     = parseJson<{ value: string; label: string }[]>(cms['stats'], [
        { value: 'CQC Good',   label: 'Quality Rating'         },
        { value: 'Nurse-Led',  label: 'Clinical Oversight'     },
        { value: '30+ Years',  label: 'Clinical Experience'    },
        { value: 'Nationwide', label: 'Coverage'               },
    ]);

    const servicesBadge    = cms['services.badge']    ?? 'What We Offer';
    const servicesHeadline = cms['services.headline'] ?? 'Comprehensive complex care and healthcare solutions';
    const servicesSubtext  = cms['services.subtext']  ?? 'We deliver high-quality, nurse-led care and support to adults and children with complex clinical needs, alongside staffing and recruitment services for healthcare providers.';
    const servicesItems    = parseJson<{ icon?: string; title: string; description: string; href: string }[]>(cms['services.items'], defaultServices);

    const whyHeadline = cms['why.headline'] ?? 'Why choose MMAB Consulting & Healthcare';
    const whySubtext  = cms['why.subtext']  ?? 'As a CQC-rated Good, nurse-led provider, we bring clinical expertise, genuine compassion, and a proven commitment to delivering exceptional care. Our leadership team leads by example, with decades of clinical and academic experience.';
    const whyPoints   = parseJson<{ title: string; description: string }[]>(cms['why.points'], defaultWhyPoints);

    const testimonialsHeadline = cms['testimonials.headline'] ?? 'What commissioners and families say about us';
    const testimonialsItems    = parseJson<{ quote: string; name: string; role: string; rating: number }[]>(cms['testimonials.items'], defaultTestimonials);

    const casesHeadline = cms['cases.headline'] ?? 'Real people. Real outcomes.';
    const casesItems    = parseJson<{ tag: string; title: string; story: string; outcome: string }[]>(cms['cases.items'], defaultCases);

    const aboutHeadline = cms['about.headline'] ?? 'About MMAB Consulting & Healthcare';
    const aboutBody1    = cms['about.body1']    ?? 'MMAB Consulting & Healthcare is a nurse-led provider rated Good by the CQC, delivering specialist complex care to adults and children across North and South East England. We support individuals with complex clinical needs, learning disabilities, autism, and mental health conditions—enabling them to live with dignity and independence in their own homes.';
    const aboutBody2    = cms['about.body2']    ?? 'Founded and led by Rosemary Lanlehin—a registered nurse with over 30 years of clinical, academic, and leadership experience—our team brings exceptional depth and professionalism to every care package. We work closely with ICBs, NHS teams, and local authorities, and we are currently accepting new referrals.';
    const aboutStats    = parseJson<{ value: string; label: string }[]>(cms['about.stats'], [
        { value: 'CQC Good',       label: 'Quality Rating'          },
        { value: 'Nurse-Led',      label: 'Clinical Leadership'     },
        { value: '30+ Years',      label: 'Experience'              },
        { value: 'Nationwide',     label: 'Coverage'                },
    ]);

    const ctaHeadline = cms['cta.headline'] ?? 'Currently accepting new care packages';
    const ctaSubtext  = cms['cta.subtext']  ?? 'We are ready to support commissioners, local authorities, and families with flexible, nurse-led care. Contact us to discuss a referral—we respond within 24 hours.';

    const contactHeadline = cms['contact.headline'] ?? 'Talk to us about care';
    const contactSubtext  = cms['contact.subtext']  ?? "Whether you're a commissioner, ICB, local authority, or a family seeking specialist care at home—we're here to help. Complete the form and we'll be in touch within 24 hours.";

    const sitePhone = cms['site.phone'] ?? '0191 380 4370';

    return (
        <>
            <Head title="Complex Care Provider | CQC Good | MMAB Consulting & Healthcare" />

            {/* ── CQC BADGE BANNER ── */}
            <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600 py-3">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                                <Award className="size-5 text-white" />
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="text-sm font-bold text-white">CQC Rated Good</div>
                                <div className="text-xs text-brand-100">Care Quality Commission · England</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <CqcWidget />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── STATS BAR - MOVED TO TOP ── */}
            <div className="border-b border-gray-100 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 divide-x divide-gray-100 md:grid-cols-4">
                        {statsItems.map((stat, i) => (
                            <motion.div key={stat.label} {...fadeUp(i * 0.08)} className="py-6 text-center">
                                <div className="font-heading text-2xl font-extrabold text-brand-700">{stat.value}</div>
                                <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-gray-500">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── HERO ── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/30 via-white to-blue-50/20 pb-20 pt-16 lg:pb-28 lg:pt-20">
                {/* Background decorative elements */}
                <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 translate-x-32 -translate-y-32 rounded-full bg-blue-100/30 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 -translate-x-24 translate-y-24 rounded-full bg-brand-100/20 blur-3xl" />
                
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Left content */}
                        <motion.div {...fadeUp()}>
                            
                            <h1 className="mb-6 font-heading text-4xl font-extrabold leading-tight text-gray-900 lg:text-5xl xl:text-6xl">
                                {heroHeadline.split('\n')[0]}<br />
                                <span className="bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">{heroHeadline.split('\n')[1] || heroHeadline.split('\n')[0]}</span>
                            </h1>
                            <p className="mb-8 text-lg leading-relaxed text-gray-600">{heroSubtext}</p>
                            <div className="flex flex-wrap gap-4">
                                <Button asChild size="lg" className="group bg-brand-600 text-white shadow-lg shadow-brand-300/30 hover:bg-brand-700">
                                    <Link href={heroCtaHref}>
                                        {heroCtaLabel}
                                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="border-2 border-brand-200 hover:bg-brand-50">
                                    <a href="tel:01913804370">
                                        <Phone className="mr-2 size-4" />
                                        Call Us Now
                                    </a>
                                </Button>
                            </div>
                            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                                {[
                                    { icon: Clock, text: 'Mon–Fri + On-call' },
                                    { icon: MapPin, text: 'North & South East England' },
                                    { icon: Shield, text: 'Fully Insured' },
                                ].map((item, i) => (
                                    <div key={item.text} className="flex items-center gap-2">
                                        {i > 0 && <span className="h-4 w-px bg-gray-200" />}
                                        <item.icon className="size-4 text-brand-500" />
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right content - Professional care image */}
                        <motion.div {...fadeUp(0.2)} className="relative">
                            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-brand-100 to-brand-200/50 shadow-2xl">
                                <img 
                                    src="https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop" 
                                    alt="Compassionate healthcare professional providing person-centred complex care support at home" 
                                    className="h-full w-full object-cover"
                                    loading="eager"
                                />
                            </div>
                            {/* Floating badge */}
                            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white bg-white p-4 shadow-xl">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <CheckCircle className="size-6 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-900">CQC Rated</div>
                                        <div className="text-xs text-gray-500">Good Overall</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── 2. SERVICES ── */}
            <section className="relative overflow-hidden bg-white py-20 lg:py-28" aria-labelledby="services-heading">
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()} className="mb-16 text-center">
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-600">
                            {servicesBadge}
                        </span>
                        <h2 id="services-heading" className="mb-4 font-heading text-3xl font-extrabold text-gray-900 lg:text-4xl xl:text-5xl">
                            {servicesHeadline}
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">{servicesSubtext}</p>
                    </motion.div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {servicesItems.map((service, i) => {
                            const Icon = iconMap[service.icon ?? ''] ?? HeartPulse;
                            return <ServiceCard key={service.title} icon={Icon} title={service.title} description={service.description} href={service.href} index={i} featured={i === 0} />;
                        })}
                    </div>
                    <motion.div {...fadeUp(0.2)} className="mt-14 text-center">
                        <Link href="/contact" className="group inline-flex items-center gap-2.5 rounded-2xl bg-brand-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-brand-300/30 transition-all duration-200 hover:bg-brand-700 active:scale-95">
                            Get in Touch
                            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1.5" />
                        </Link>
                        <p className="mt-4 text-sm text-gray-500">Clinical training also available · <Link href="/training" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">View training courses</Link></p>                    </motion.div>
                </div>
            </section>

            {/* ── 3. WHY CHOOSE US ── */}
            <section className="bg-gradient-to-br from-gray-50 to-brand-50/20 py-20 lg:py-28" aria-labelledby="difference-heading">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <motion.div {...fadeUp()}>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-600">Why Choose Us</p>
                            <h2 id="difference-heading" className="mb-5 font-heading text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl xl:text-5xl">
                                {whyHeadline}
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed text-gray-600">{whySubtext}</p>
                            <Button asChild className="group bg-brand-600 font-semibold text-white hover:bg-brand-700 active:scale-95 transition-all duration-200">
                                <Link href="/about">Learn More About Us <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" /></Link>
                            </Button>
                        </motion.div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            {whyPoints.map((point, i) => (
                                <motion.div key={point.title} {...fadeUp(i * 0.07)} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                                        <CheckCircle className="size-5 text-brand-600" />
                                    </div>
                                    <div>
                                        <div className="mb-1 text-sm font-bold text-gray-900">{point.title}</div>
                                        <div className="text-xs leading-relaxed text-gray-600">{point.description}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. TESTIMONIALS ── */}
            <section className="bg-white py-20 lg:py-28" aria-labelledby="testimonials-heading">
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

            {/* ── 5. CASE STUDIES ── */}
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

            {/* ── 6. ABOUT ── */}
            <section className="bg-white py-20 lg:py-28" aria-labelledby="about-heading">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 shadow-2xl lg:flex">
                        <motion.div {...fadeUp()} className="flex flex-col justify-center p-10 text-white lg:w-3/5 lg:p-14">
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-200">About MMAB Healthcare</p>
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

            {/* ── 7. PROCESS ── */}
            <section className="bg-gradient-to-br from-gray-50 to-brand-50/20 py-20 lg:py-28" aria-labelledby="process-heading">
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

            {/* ── 8. CONTACT FORM ── */}
            <section className="bg-white py-20 lg:py-28" aria-labelledby="contact-form-heading">
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
