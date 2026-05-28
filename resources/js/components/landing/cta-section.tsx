import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, Download, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

type CTASectionProps = {
    headline?: string;
    subtext?: string;
};

export function CTASection({
    headline = 'Your journey to better care starts here',
    subtext = 'Speak to our specialist team today and take the first step towards advancing your clinical practice.',
}: CTASectionProps) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 py-24 text-white">
            {/* Decorative shapes */}
            <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-500/20 blur-2xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-brand-400/15 blur-2xl" />

            <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-200"
                >
                    Get Started Today
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                    className="mb-4 font-heading text-3xl font-extrabold leading-tight lg:text-4xl xl:text-5xl"
                >
                    {headline}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.2 }}
                    className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-brand-100"
                >
                    {subtext}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    <Button
                        asChild
                        size="lg"
                        className="group bg-white font-semibold text-brand-700 shadow-xl hover:bg-brand-50 active:scale-95 transition-all duration-200"
                    >
                        <a href="tel:+440000000000">
                            <Phone className="mr-2 size-4 transition-transform group-hover:-rotate-12" />
                            Call Now
                        </a>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        className="group border border-white/30 bg-white/10 font-semibold text-white backdrop-blur-sm hover:bg-white/20 active:scale-95 transition-all duration-200"
                    >
                        <Link href="/courses">
                            <CalendarCheck className="mr-2 size-4 transition-transform group-hover:scale-110" />
                            Apply Now
                        </Link>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        variant="ghost"
                        className="group text-brand-100 hover:bg-white/10 hover:text-white"
                    >
                        <Link href="/courses">
                            <Download className="mr-2 size-4 transition-transform group-hover:translate-y-0.5" />
                            View Courses
                            <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
