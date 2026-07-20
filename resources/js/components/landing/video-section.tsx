import { motion } from 'framer-motion';

type VideoSectionProps = {
    youtubeId?: string;
    title?: string;
    subtitle?: string;
    /** @deprecated use youtubeId instead */
    src?: string;
};

export function VideoSection({
    youtubeId,
    title = 'Care that makes a real difference',
    subtitle = 'See how MMAB Healthcare supports adults and young people to live safely and independently.',
}: VideoSectionProps) {
    return (
        <section
            className="relative overflow-hidden py-24"
            aria-labelledby="video-section-title"
        >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800" />
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-700/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />

            <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="mb-12 text-center"
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-200">
                        Our Story
                    </span>
                    <h2
                        id="video-section-title"
                        className="mb-3 font-heading text-3xl font-extrabold text-white lg:text-4xl xl:text-5xl"
                    >
                        {title}
                    </h2>
                    <p className="mx-auto max-w-xl text-base leading-relaxed text-brand-200">
                        {subtitle}
                    </p>
                </motion.div>

                {/* Video embed */}
                <motion.div
                    initial={{ opacity: 0, y: 32, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
                >
                    <div className="relative aspect-video w-full bg-black">
                        {youtubeId ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                                title={title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full"
                                loading="lazy"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-brand-900">
                                <p className="text-sm text-brand-300">Video coming soon</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Below-video trust strip */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-brand-300"
                >
                    {['CQC Rated Good', 'Nurse-Led Care', 'North & South East England', '30+ Years Experience'].map(
                        (item, i) => (
                            <span key={item} className="flex items-center gap-2">
                                {i > 0 && <span className="h-3 w-px bg-white/20" />}
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                                {item}
                            </span>
                        ),
                    )}
                </motion.div>
            </div>
        </section>
    );
}
