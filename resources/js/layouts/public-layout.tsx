import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Award,
    BookOpen,
    Brain,
    ChevronDown,
    ClipboardList,
    Facebook,
    GraduationCap,
    HeartPulse,
    LayoutDashboard,
    Linkedin,
    LogIn,
    Mail,
    MapPin,
    Menu,
    Phone,
    ShieldCheck,
    Stethoscope,
    UserPlus,
    Users,
    X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { about, contact, dashboard, home, login, register } from '@/routes';
import type { Auth } from '@/types';

import { CqcWidget } from '@/components/cqc-widget';

// ─── Nav data ─────────────────────────────────────────────────────────────────

const servicesMenu = [
    {
        icon: HeartPulse,
        label: 'Complex & Clinical Care',
        desc: 'Tracheostomy, ventilation, enteral feeding & more',
        href: '/contact',
    },
    {
        icon: Brain,
        label: 'Mental Health & LD Support',
        desc: 'Mental health, learning disability & autism',
        href: '/contact',
    },
    {
        icon: Users,
        label: 'Domiciliary & Respite Care',
        desc: 'Flexible care for adults and young people',
        href: '/contact',
    },
    {
        icon: Stethoscope,
        label: 'Clinical Training',
        desc: 'CPD-accredited complex care programmes',
        href: '/courses',
    },
    {
        icon: ClipboardList,
        label: 'Business Consultancy',
        desc: 'CQC compliance & care quality improvement',
        href: '/contact',
    },
    {
        icon: ShieldCheck,
        label: 'ICB & NHS Partnerships',
        desc: 'Accepting new packages from commissioners',
        href: '/contact',
    },
];

const aboutMenu = null; // removed — About Us is a direct link

// ─── Dropdown component ───────────────────────────────────────────────────────

type DropdownItem = { icon: React.ElementType; label: string; desc: string; href: string };

function NavDropdown({
    label,
    items,
    cols = 2,
}: {
    label: string;
    items: DropdownItem[];
    cols?: 1 | 2 | 3;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const gridCols = cols === 3 ? 'sm:grid-cols-3' : cols === 2 ? 'sm:grid-cols-2' : 'grid-cols-1';

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                onMouseEnter={() => setOpen(true)}
                className={`flex items-center gap-1 border-b-2 px-4 py-5 text-sm font-semibold transition-colors duration-150 ${
                    open
                        ? 'border-brand-600 text-brand-700'
                        : 'border-transparent text-gray-700 hover:border-brand-400 hover:text-brand-700'
                }`}
                aria-expanded={open}
                aria-haspopup="true"
            >
                {label}
                <ChevronDown
                    className={`size-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        onMouseLeave={() => setOpen(false)}
                        className="absolute top-full left-1/2 z-50 mt-1 w-max min-w-[320px] -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-200/60"
                    >
                        {/* Arrow pointer */}
                        <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-gray-100 bg-white" />

                        <div className={`grid gap-0.5 p-3 ${gridCols}`}>
                            {items.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-brand-50"
                                >
                                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 transition-colors group-hover:bg-brand-200">
                                        <item.icon className="size-4 text-brand-700" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900 group-hover:text-brand-700">
                                            {item.label}
                                        </div>
                                        <div className="text-xs text-gray-400">{item.desc}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Footer strip */}
                        <div className="border-t border-gray-50 bg-gray-50/80 px-4 py-2.5">
                            <Link
                                href="/contact"
                                onClick={() => setOpen(false)}
                                className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                            >
                                Get in touch →
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Scroll-aware shadow
    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <div className="flex min-h-screen flex-col bg-white">

            {/* ── Top utility bar ── */}
            <div className="bg-brand-800 text-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">
                    <div className="flex items-center gap-5">
                        <a
                            href="tel:01913804370"
                            className="flex items-center gap-1.5 transition-colors hover:text-brand-200"
                        >
                            <Phone className="size-3" />
                            0191 380 4370
                        </a>
                        <a
                            href="mailto:info@mmabconsulting.com"
                            className="hidden items-center gap-1.5 transition-colors hover:text-brand-200 sm:flex"
                        >
                            <Mail className="size-3" />
                            info@mmabconsulting.com
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        {auth?.user ? (
                            <Link
                                href={dashboard()}
                                className="flex items-center gap-1.5 transition-colors hover:text-brand-200"
                            >
                                <LayoutDashboard className="size-3" />
                                My Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="flex items-center gap-1 transition-colors hover:text-brand-200"
                                >
                                    <LogIn className="size-3" />
                                    Log in
                                </Link>
                                <span className="h-3 w-px bg-white/20" />
                                <Link
                                    href={register()}
                                    className="flex items-center gap-1 rounded bg-white/15 px-2.5 py-1 font-medium transition-colors hover:bg-white/25"
                                >
                                    <UserPlus className="size-3" />
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Main header ── */}
            <header
                className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ${
                    scrolled ? 'shadow-lg shadow-gray-200/50' : 'border-b border-gray-100'
                }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                    {/* Logo — image + tagline */}
                    <Link href={home()} className="flex items-center gap-3 py-3.5">
                        <img
                            src="/images/logo.webp"
                            alt="MMAB Healthcare"
                            className="h-12 w-auto object-contain"
                        />
                        <div className="hidden border-l border-gray-200 pl-3 sm:block">
                            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-600">
                                Nurse-Led Care
                            </div>
                            <div className="text-[9px] font-medium text-gray-400">
                                CQC Rated Good
                            </div>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden items-stretch lg:flex" aria-label="Main navigation">
                        {/* Simple links */}
                        <Link
                            href={home()}
                            className="flex items-center border-b-2 border-transparent px-4 py-5 text-sm font-semibold text-gray-700 transition-colors hover:border-brand-500 hover:text-brand-700"
                        >
                            Home
                        </Link>

                        {/* Services mega-dropdown */}
                        <NavDropdown label="Services" items={servicesMenu} cols={2} />

                        {/* About link */}
                        <Link
                            href={about()}
                            className="flex items-center border-b-2 border-transparent px-4 py-5 text-sm font-semibold text-gray-700 transition-colors hover:border-brand-500 hover:text-brand-700"
                        >
                            About Us
                        </Link>

                        <Link
                            href="/training"
                            className="flex items-center border-b-2 border-transparent px-4 py-5 text-sm font-semibold text-gray-700 transition-colors hover:border-brand-500 hover:text-brand-700"
                        >
                            Training
                        </Link>

                        <Link
                            href={contact()}
                            className="flex items-center border-b-2 border-transparent px-4 py-5 text-sm font-semibold text-gray-700 transition-colors hover:border-brand-500 hover:text-brand-700"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Desktop right actions */}
                    <div className="hidden items-center gap-2 lg:flex">
                        <a
                            href="tel:01913804370"
                            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                        >
                            <Phone className="size-4" />
                            0191 380 4370
                        </a>
                        <Link
                            href="/contact"
                            className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-300/30 transition-all duration-200 hover:from-brand-700 hover:to-brand-600 hover:shadow-lg active:scale-95"
                        >
                            Refer a Package
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 lg:hidden"
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="size-5" />
                    </button>
                </div>
            </header>

            {/* ── Mobile drawer ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Drawer panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-0 right-0 bottom-0 z-50 flex w-80 max-w-full flex-col bg-white shadow-2xl lg:hidden"
                        >
                            {/* Drawer header */}
                            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                                <div className="flex items-center gap-2.5">
                                    <img
                                        src="/images/logo.webp"
                                        alt="MMAB Healthcare"
                                        className="h-9 w-auto object-contain"
                                    />
                                    <div className="border-l border-gray-200 pl-2.5">
                                        <div className="text-[10px] font-semibold uppercase tracking-widest text-brand-600">
                                            Nurse-Led Care
                                        </div>
                                        <div className="text-[9px] text-gray-400">
                                            CQC Rated Good
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
                                    aria-label="Close menu"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>

                            {/* Drawer links */}
                            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile navigation">
                                <Link
                                    href={home()}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-50 hover:text-brand-700"
                                >
                                    Home
                                </Link>

                                {/* Services accordion */}
                                <div>
                                    <button
                                        onClick={() => setMobileCoursesOpen((v) => !v)}
                                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-50 hover:text-brand-700"
                                    >
                                        Services
                                        <ChevronDown
                                            className={`size-4 transition-transform duration-200 ${mobileCoursesOpen ? 'rotate-180 text-brand-600' : 'text-gray-400'}`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {mobileCoursesOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.22 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-brand-100 pl-3">
                                                    {servicesMenu.map((item) => (
                                                        <Link
                                                            key={item.label}
                                                            href={item.href}
                                                            onClick={() => setMobileOpen(false)}
                                                            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                                                        >
                                                            <item.icon className="size-4 shrink-0 text-brand-500" />
                                                            <span className="font-medium">{item.label}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <Link
                                    href={about()}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-50 hover:text-brand-700"
                                >
                                    About Us
                                </Link>
                                <Link
                                    href="/training"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-50 hover:text-brand-700"
                                >
                                    Training
                                </Link>
                                <Link
                                    href={contact()}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-50 hover:text-brand-700"
                                >
                                    Contact Us
                                </Link>
                            </nav>

                            {/* Drawer footer */}
                            <div className="border-t border-gray-100 p-4 space-y-2.5">
                                {auth?.user ? (
                                    <Link
                                        href={dashboard()}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-200 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                                    >
                                        <LayoutDashboard className="size-4" />
                                        My Dashboard
                                    </Link>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2">
                                        <Link
                                            href={login()}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                                        >
                                            <LogIn className="size-4" />
                                            Log in
                                        </Link>
                                        <Link
                                            href={register()}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                                        >
                                            <UserPlus className="size-4" />
                                            Register
                                        </Link>
                                    </div>
                                )}
                                <Link
                                    href="/contact"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 py-3 text-sm font-bold text-white shadow-md transition-all hover:from-brand-700 hover:to-brand-600"
                                >
                                    Refer a Package
                                </Link>
                                <a
                                    href="tel:01913804370"
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-50 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                                >
                                    <Phone className="size-4 text-brand-600" />
                                    0191 380 4370
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Page content */}
            <main className="flex-1">{children}</main>

            {/* ── Footer ── */}
            <footer className="bg-gray-950 text-gray-400">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid gap-10 md:grid-cols-4">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <div className="mb-5 flex items-center gap-3">
                                <img
                                    src="/images/logo.webp"
                                    alt="MMAB Healthcare"
                                    className="h-10 w-auto object-contain brightness-0 invert"
                                />
                                <div className="border-l border-white/20 pl-3">
                                    <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-300">
                                        Nurse-Led Care
                                    </div>
                                    <div className="text-[9px] text-gray-500">
                                        CQC Rated Good
                                    </div>
                                </div>
                            </div>
                            <p className="mb-5 max-w-sm text-sm leading-relaxed">
                                Nurse-led home care provider rated GOOD by the CQC. Serving North and South East
                                England with complex clinical care, mental health and LD support, and domiciliary
                                care for adults and young people. <em>We Care.</em>
                            </p>
                            <div className="mb-5 space-y-2 text-sm">
                                <a href="tel:01913804370" className="flex items-center gap-2 transition-colors hover:text-brand-400">
                                    <Phone className="size-3.5 shrink-0 text-brand-500" />
                                    0191 380 4370
                                </a>
                                <a href="mailto:info@mmabconsulting.com" className="flex items-center gap-2 transition-colors hover:text-brand-400">
                                    <Mail className="size-3.5 shrink-0 text-brand-500" />
                                    info@mmabconsulting.com
                                </a>
                                <div className="flex items-start gap-2 text-gray-500">
                                    <MapPin className="mt-0.5 size-3.5 shrink-0 text-brand-500" />
                                    <span>Victoria House, Whitfield Court, St John's Road, Meadowfield, Durham DH7 8XL</span>
                                </div>
                                <div className="flex items-start gap-2 text-gray-500">
                                    <MapPin className="mt-0.5 size-3.5 shrink-0 text-brand-500" />
                                    <span>32 Avondale Road, London N13 4DU</span>
                                </div>
                            </div>
                            {/* Social links */}
                            <div className="flex items-center gap-3">
                                <a
                                    href="https://www.facebook.com/profile.php?id=61577224052022"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="MMAB on Facebook"
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-400 transition-colors hover:bg-brand-600 hover:text-white"
                                >
                                    <Facebook className="size-4" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/mmab-health-care/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="MMAB on LinkedIn"
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-400 transition-colors hover:bg-brand-600 hover:text-white"
                                >
                                    <Linkedin className="size-4" />
                                </a>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
                                Navigation
                            </h3>
                            <ul className="space-y-2.5 text-sm">
                                {[
                                    { label: 'Home',       href: home() },
                                    { label: 'Services',   href: '/contact' },
                                    { label: 'About Us',   href: about() },
                                    { label: 'Training',   href: '/training' },
                                    { label: 'Contact Us', href: contact() },
                                ].map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="transition-colors hover:text-brand-400">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
                                Our Services
                            </h3>
                            <ul className="space-y-2.5 text-sm">
                                <li>
                                    <Link href="/contact" className="transition-colors hover:text-brand-400">
                                        Complex &amp; Clinical Care
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="transition-colors hover:text-brand-400">
                                        Mental Health &amp; LD Support
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="transition-colors hover:text-brand-400">
                                        Domiciliary &amp; Respite Care
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/courses" className="transition-colors hover:text-brand-400">
                                        Clinical Training
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="transition-colors hover:text-brand-400">
                                        Business Consultancy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* ── CQC Widget ── */}
                    <div className="mt-12 border-t border-gray-800 pt-10">
                        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
                            {/* Official CQC widget component */}
                            <div className="shrink-0">
                                <CqcWidget />
                            </div>
                            <p className="max-w-xs text-xs leading-relaxed text-gray-500">
                                MMAB Healthcare is inspected and regulated by the Care Quality Commission — the independent regulator of health and social care in England.{' '}
                                <a
                                    href="https://www.cqc.org.uk/location/1-15528561702"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-brand-400 underline underline-offset-2 hover:text-brand-300"
                                >
                                    View our CQC report
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-gray-800 pt-8 text-xs sm:flex-row">
                        <span>© {new Date().getFullYear()} MMAB Healthcare. All rights reserved.</span>
                        <div className="flex gap-5">
                            <Link href="/contact" className="transition-colors hover:text-brand-400">
                                Privacy Policy
                            </Link>
                            <Link href="/contact" className="transition-colors hover:text-brand-400">
                                Terms of Use
                            </Link>
                            <Link href="/contact" className="transition-colors hover:text-brand-400">
                                Accessibility
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
