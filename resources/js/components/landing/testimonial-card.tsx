import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

type TestimonialCardProps = {
    quote: string;
    name: string;
    role: string;
    rating?: number;
    initials?: string;
    index?: number;
};

export function TestimonialCard({ quote, name, role, rating = 5, initials, index = 0 }: TestimonialCardProps) {
    const avatarInitials = initials ?? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
            {/* Stars */}
            <div className="mb-4 flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`size-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                    />
                ))}
            </div>

            {/* Quote icon */}
            <Quote className="mb-3 size-7 text-brand-200" aria-hidden />

            {/* Quote text */}
            <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600 italic">"{quote}"</p>

            {/* Author */}
            <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
                <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-sm"
                    aria-hidden
                >
                    {avatarInitials}
                </div>
                <div>
                    <div className="text-sm font-bold text-gray-900">{name}</div>
                    <div className="text-xs text-gray-400">{role}</div>
                </div>
            </div>
        </motion.div>
    );
}
