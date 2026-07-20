import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useState } from 'react';

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] },
    }),
};

type HeroSectionProps = {
    headline?: string;
    subtext?: string;
    ctaLabel?: string;
    ctaHref?: string;
    youtubeId?: string;
};

export function HeroSection({
    headline = "Specialist Care\nAnd Support",
    subtext = 'With over 10 years of experience, we provide specialist clinical training to healthcare professionals supporting children and young people with complex care needs, learning disabilities, and neurological conditions across the UK.',
    ctaLabel = 'Find out more',
    ctaHref = '/courses',
    youtubeId = 'dQw4w9WgXcQ',
}: HeroSectionProps) {
    const [videoOpen, setVideoOpen] = useState(false);

    return (
        <section
            className="relative overflow-hidden bg-brand-600 pb-0 pt-16 lg:pt-20"
            aria-label="Hero"
        >
            {/* Very subtle noise texture overlay */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                }}
            />

            {/* ── TOP WAVE — curves away from the nav above ── */}
            <div aria-hidden className="pointer-events-none absolute top-0 left-0 right-0 leading-none">
                <svg
                    viewBox="0 0 1440 48"
                    className="block w-full"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,0 L1440,0 L1440,12 C1100,48 340,0 0,32 Z"
                        fill="white"
                        fillOpacity="0.08"
                    />
                </svg>
            </div>

            <div className="relative mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-10 lg:pb-28">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

                    {/* ── LEFT: Copy ── */}
                    <div className="text-white">

                        {/* Headline — Kalam handwritten font, exactly like the reference */}
                        <motion.h1
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={0}
                            className="mb-5 leading-[1.15] text-white"
                            style={{
                                fontFamily: "'Kalam', cursive",
                                fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
                                fontWeight: 700,
                            }}
                        >
                            {headline.split('\n').map((line, i) => (
                                <span key={i}>{line}{i < headline.split('\n').length - 1 && <br />}</span>
                            ))}
                        </motion.h1>

                        {/* Body copy — Inter, clean and readable */}
                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={1}
                            className="mb-8 max-w-md text-base leading-relaxed text-white/90 lg:text-[1.05rem]"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            {subtext}
                        </motion.p>

                        {/* CTA buttons */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={2}
                            className="flex flex-wrap items-center gap-4"
                        >
                            {/* Primary — teal/dark, matches reference exactly */}
                            <Link
                                href={ctaHref}
                                className="group inline-flex items-center gap-2 rounded-md bg-[#1a9e8f] px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-[#158075] active:scale-95"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                {ctaLabel}
                                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </Link>

                            {/* Secondary — play video */}
                            <button
                                onClick={() => setVideoOpen(true)}
                                className="group inline-flex items-center gap-2.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                                aria-label="Watch our video"
                            >
                                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/40 bg-white/10 transition-all duration-200 group-hover:border-white/70 group-hover:bg-white/20">
                                    <Play className="ml-0.5 size-4 fill-white text-white" />
                                </span>
                                Watch our story
                            </button>
                        </motion.div>
                    </div>

                    {/* ── RIGHT: Oval image with teal decorative stroke ── */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={1}
                        className="relative flex items-center justify-center"
                    >
                        {/* Teal decorative curved stroke — behind the image, offset bottom-right */}
                        <svg
                            aria-hidden
                            viewBox="0 0 420 380"
                            className="absolute -bottom-6 -right-6 w-[90%] max-w-[420px] opacity-90"
                            fill="none"
                        >
                            <ellipse
                                cx="210"
                                cy="195"
                                rx="195"
                                ry="175"
                                stroke="#1a9e8f"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeDasharray="1 0"
                                opacity="0.85"
                            />
                        </svg>

                        {/* White border ring behind image */}
                        <div
                            className="absolute inset-0 m-auto rounded-[50%] border-4 border-white/30"
                            style={{ width: '88%', height: '88%' }}
                            aria-hidden
                        />

                        {/* Oval image/video container — exact shape from reference */}
                        <div
                            className="relative z-10 overflow-hidden shadow-2xl"
                            style={{
                                borderRadius: '50% / 45%',
                                width: '100%',
                                maxWidth: '480px',
                                aspectRatio: '1.15 / 1',
                            }}
                        >
                        {/*
                             * Autoplay looping video — clipped to the oval shape.
                             * Hosted locally in public/videos/hero.mp4
                             */}
                            <video
                                src="/videos/hero.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="h-full w-full object-cover object-center"
                                aria-label="A caregiver warmly supporting a child with complex care needs at home"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── BOTTOM WAVE — curves into the white section below ── */}
            <div aria-hidden className="pointer-events-none relative -mb-px leading-none">
                <svg
                    viewBox="0 0 1440 90"
                    className="block w-full"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Second layer — slightly offset for depth */}
                    <path
                        d="M0,30 C240,80 480,0 720,45 C960,90 1200,10 1440,50 L1440,90 L0,90 Z"
                        fill="white"
                        fillOpacity="0.35"
                    />
                    {/* Main white wave */}
                    <path
                        d="M0,55 C200,10 400,80 720,40 C1040,0 1260,70 1440,30 L1440,90 L0,90 Z"
                        fill="white"
                    />
                </svg>
            </div>

            {/* ── VIDEO MODAL ── */}
            {videoOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    onClick={() => setVideoOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Video player"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="aspect-video w-full">
                            <iframe
                                className="h-full w-full"
                                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                                title="MMAB Consulting — Our Story"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <button
                            onClick={() => setVideoOpen(false)}
                            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                            aria-label="Close video"
                        >
                            ✕
                        </button>
                    </motion.div>
                </div>
            )}
        </section>
    );
}
