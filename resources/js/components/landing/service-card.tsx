import { Link } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, type LucideIcon } from 'lucide-react';

type ServiceCardProps = {
    icon: LucideIcon;
    title: string;
    description: string;
    href: string;
    index?: number;
    featured?: boolean;
};

// Icon bounce + spin animation on hover
const iconVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: {
        rotate: [0, -12, 10, -6, 4, 0],
        scale: [1, 1.18, 1.12, 1.16, 1.1, 1.13],
        transition: { duration: 0.55, ease: 'easeInOut' },
    },
};

const bgVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.08, transition: { duration: 0.3, ease: 'easeOut' } },
};

export function ServiceCard({
    icon: Icon,
    title,
    description,
    href,
    index = 0,
    featured = false,
}: ServiceCardProps) {
    const reduced = useReducedMotion();

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.5,
                delay: reduced ? 0 : index * 0.07,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover="hover"
            animate="rest"
            className={`group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                featured
                    ? 'border-2 border-brand-400 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white shadow-xl shadow-brand-300/30'
                    : 'border border-gray-100 bg-white shadow-sm hover:border-brand-200 hover:shadow-brand-100/40'
            }`}
        >
            {/* Shimmer sweep on hover */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <div className="flex flex-1 flex-col p-6">
                {/* Animated icon */}
                <div className="mb-5 flex items-start justify-between">
                    <motion.div
                        variants={bgVariants}
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                            featured
                                ? 'bg-white/20 shadow-inner'
                                : 'bg-gradient-to-br from-brand-50 to-brand-100 shadow-sm'
                        }`}
                    >
                        <motion.div variants={iconVariants}>
                            <Icon
                                className={`size-7 ${featured ? 'text-white' : 'text-brand-600'}`}
                                strokeWidth={1.75}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Subtle index number */}
                    <span
                        className={`text-4xl font-black leading-none select-none ${
                            featured ? 'text-white/10' : 'text-gray-100'
                        }`}
                    >
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>

                <h3
                    className={`mb-2.5 font-heading text-[1.05rem] font-bold leading-snug ${
                        featured ? 'text-white' : 'text-gray-900'
                    }`}
                >
                    {title}
                </h3>

                <p
                    className={`mb-6 flex-1 text-sm leading-relaxed ${
                        featured ? 'text-white/80' : 'text-gray-500'
                    }`}
                >
                    {description}
                </p>

                {/* Learn More link */}
                <Link
                    href={href}
                    className={`group/link inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-200 ${
                        featured
                            ? 'text-white hover:gap-2.5'
                            : 'text-brand-600 hover:text-brand-700 hover:gap-2.5'
                    }`}
                    aria-label={`Learn more about ${title}`}
                >
                    Learn More
                    <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                        <ArrowRight className="size-4" />
                    </motion.span>
                </Link>
            </div>

            {/* Bottom accent line — non-featured only */}
            {!featured && (
                <div className="h-0.5 w-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-500 group-hover:w-full" />
            )}
        </motion.div>
    );
}
