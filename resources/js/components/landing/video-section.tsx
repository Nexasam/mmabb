import { motion } from 'framer-motion';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type VideoSectionProps = {
    src?: string;
    title?: string;
    subtitle?: string;
};

export function VideoSection({
    src = '/videos/difference.mp4',
    title = 'See how we make a difference',
    subtitle = 'Watch how MMAB Consulting is transforming paediatric complex care training across the UK.',
}: VideoSectionProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [started, setStarted] = useState(false);
    const [hovered, setHovered] = useState(false);

    function togglePlay() {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) {
            v.play();
            setPlaying(true);
            setStarted(true);
        } else {
            v.pause();
            setPlaying(false);
        }
    }

    function toggleMute() {
        const v = videoRef.current;
        if (!v) return;
        v.muted = !v.muted;
        setMuted(v.muted);
    }

    function handleTimeUpdate() {
        const v = videoRef.current;
        if (!v || !v.duration) return;
        setProgress((v.currentTime / v.duration) * 100);
    }

    function handleLoadedMetadata() {
        if (videoRef.current) setDuration(videoRef.current.duration);
    }

    function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
        const v = videoRef.current;
        if (!v) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        v.currentTime = ratio * v.duration;
    }

    function formatTime(s: number) {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec.toString().padStart(2, '0')}`;
    }

    const currentTime = duration ? (progress / 100) * duration : 0;

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

                {/* Video player */}
                <motion.div
                    initial={{ opacity: 0, y: 32, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    {/* Video element */}
                    <div className="relative aspect-video w-full bg-black">
                        {src ? (
                            <video
                                ref={videoRef}
                                src={src}
                                className="h-full w-full object-cover"
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                onEnded={() => setPlaying(false)}
                                playsInline
                                preload="metadata"
                                aria-label="MMAB Consulting — See how we make a difference"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-brand-900">
                                <p className="text-sm text-brand-300">Video coming soon</p>
                            </div>
                        )}

                        {/* Dark gradient overlay — fades out when playing & not hovered */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 transition-opacity duration-500 ${
                                playing && !hovered ? 'opacity-0' : 'opacity-100'
                            }`}
                        />
                        <button
                            onClick={togglePlay}
                            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-400 ${
                                playing && !hovered ? 'opacity-0' : 'opacity-100'
                            }`}
                            aria-label={playing ? 'Pause video' : 'Play video'}
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.93 }}
                                className={`flex h-20 w-20 items-center justify-center rounded-full shadow-2xl backdrop-blur-sm transition-all duration-300 ${
                                    started
                                        ? 'bg-white/20 ring-2 ring-white/40'
                                        : 'bg-white shadow-brand-400/30 hover:shadow-brand-400/50'
                                }`}
                            >
                                {playing ? (
                                    <Pause
                                        className={`size-8 ${started ? 'fill-white text-white' : 'fill-brand-600 text-brand-600'}`}
                                    />
                                ) : (
                                    <Play
                                        className={`ml-1 size-8 ${started ? 'fill-white text-white' : 'fill-brand-600 text-brand-600'}`}
                                    />
                                )}
                            </motion.div>
                        </button>

                        {/* Pulse ring on initial state */}
                        {!started && (
                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <div className="h-20 w-20 animate-ping rounded-full bg-white/20" />
                            </div>
                        )}

                        {/* Bottom controls bar */}
                        <div
                            className={`absolute right-0 bottom-0 left-0 px-5 pb-4 pt-8 transition-opacity duration-300 ${
                                playing && !hovered ? 'opacity-0' : 'opacity-100'
                            }`}
                            style={{
                                background:
                                    'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
                            }}
                        >
                            {/* Progress bar */}
                            <div
                                className="mb-3 h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-white/20 hover:h-2.5 transition-all duration-150"
                                onClick={handleSeek}
                                role="slider"
                                aria-label="Video progress"
                                aria-valuenow={Math.round(progress)}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-brand-300 to-white transition-all duration-100"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            {/* Controls row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {/* Play/pause mini */}
                                    <button
                                        onClick={togglePlay}
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                                        aria-label={playing ? 'Pause' : 'Play'}
                                    >
                                        {playing ? (
                                            <Pause className="size-3.5 fill-white" />
                                        ) : (
                                            <Play className="ml-0.5 size-3.5 fill-white" />
                                        )}
                                    </button>

                                    {/* Mute */}
                                    <button
                                        onClick={toggleMute}
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                                        aria-label={muted ? 'Unmute' : 'Mute'}
                                    >
                                        {muted ? (
                                            <VolumeX className="size-3.5" />
                                        ) : (
                                            <Volume2 className="size-3.5" />
                                        )}
                                    </button>

                                    {/* Time */}
                                    <span className="text-xs font-medium tabular-nums text-white/80">
                                        {formatTime(currentTime)}{' '}
                                        <span className="text-white/40">/</span>{' '}
                                        {formatTime(duration)}
                                    </span>
                                </div>

                                {/* Caption */}
                                <span className="hidden text-xs font-semibold text-white/60 sm:block">
                                    MMAB Consulting
                                </span>
                            </div>
                        </div>
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
                    {['CPD Accredited', 'Nurse-Led Training', 'UK-Wide Delivery', '500+ Professionals Trained'].map(
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
