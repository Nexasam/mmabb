import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import InputError from '@/components/input-error';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Contact() {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/enquiries', { onSuccess: () => reset() });
    }

    return (
        <>
            <Head title="Contact Us" />

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 pb-0 pt-20">
                <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <span className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-200">
                            Contact Us
                        </span>
                        <h1 className="mb-4 font-heading text-4xl font-extrabold leading-tight text-white lg:text-5xl">Refer a Package or Get in Touch</h1>
                        <p className="text-lg leading-relaxed text-brand-100">
                            Whether you're a commissioner, ICB, local authority, or a family looking for specialist nurse-led care, we'd love to hear from you.
                        </p>
                    </div>
                </div>
                <div className="pointer-events-none leading-none">
                    <svg viewBox="0 0 1440 60" className="block w-full fill-white" preserveAspectRatio="none">
                        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
                    </svg>
                </div>
            </section>

            {/* ── Contact cards ─────────────────────────────────────────────── */}
            <section className="border-b border-gray-100 bg-white py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-4 sm:grid-cols-3">
                        {[
                            { icon: Phone,  label: 'Call Us',   value: '0191 380 4370',            sub: 'Mon–Fri, 9am–5pm'                    },
                            { icon: Mail,   label: 'Email Us',  value: 'info@mmabconsulting.com',  sub: 'We respond within 24 hours'          },
                            { icon: MapPin, label: 'Location',  value: 'Meadowfield, Durham',       sub: 'North & South East England'          },
                        ].map((item) => (
                            <div key={item.label} className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50">
                                    <item.icon className="size-5 text-brand-600" />
                                </div>
                                <div>
                                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">{item.label}</div>
                                    <div className="mt-0.5 font-semibold text-gray-900">{item.value}</div>
                                    <div className="text-xs text-gray-400">{item.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Form + info ───────────────────────────────────────────────── */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-3">

                        {/* Info sidebar */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="mb-3 text-lg font-bold text-gray-900">Refer a Package or Make an Enquiry</h2>
                                <p className="text-sm leading-relaxed text-gray-500">
                                    Whether you're referring a complex care package, enquiring about clinical training, or a family looking for support — fill in the form and we'll be in touch within 24 hours.
                                </p>
                            </div>

                            <div className="rounded-xl bg-brand-50 p-6">
                                <div className="mb-3 flex items-center gap-2">
                                    <Clock className="size-4 text-brand-600" />
                                    <span className="text-sm font-semibold text-brand-800">Office Hours</span>
                                </div>
                                <ul className="space-y-1.5 text-sm text-gray-600">
                                    <li className="flex justify-between"><span>Monday – Friday</span><span className="font-medium">9:00am – 5:00pm</span></li>
                                    <li className="flex justify-between"><span>Saturday</span><span className="font-medium">Closed</span></li>
                                    <li className="flex justify-between"><span>Sunday</span><span className="font-medium">Closed</span></li>
                                </ul>
                            </div>

                            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                                <h3 className="mb-2 font-bold text-gray-900">Looking for training?</h3>
                                <p className="mb-4 text-sm text-gray-500">
                                    We deliver CPD-accredited complex care training and clinical consultancy to healthcare professionals and organisations across the UK.
                                </p>
                                <Link href="/courses" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
                                    Browse Training Courses →
                                </Link>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                                <h2 className="mb-6 text-xl font-bold text-gray-900">Send Us a Message</h2>

                                {wasSuccessful && (
                                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                                        <Mail className="mt-0.5 size-4 shrink-0 text-green-600" />
                                        <p className="text-sm font-medium text-green-700">
                                            Your message has been sent. We'll be in touch within 24 hours.
                                        </p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name <span className="text-red-500">*</span></Label>
                                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Your full name" className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:border-brand-500 focus:bg-white" />
                                            <InputError message={errors.name} />
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address <span className="text-red-500">*</span></Label>
                                            <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="your@email.com" className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:border-brand-500 focus:bg-white" />
                                            <InputError message={errors.email} />
                                        </div>
                                    </div>
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</Label>
                                            <Input id="phone" type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="+44 7700 000000" className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:border-brand-500 focus:bg-white" />
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">Subject</Label>
                                            <Input id="subject" value={data.subject} onChange={(e) => setData('subject', e.target.value)} placeholder="Care referral, training enquiry, consultancy…" className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:border-brand-500 focus:bg-white" />
                                        </div>
                                    </div>
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="message" className="text-sm font-semibold text-gray-700">Message <span className="text-red-500">*</span></Label>
                                        <textarea
                                            id="message"
                                            rows={5}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            placeholder="Tell us about the individual's care needs, your referral, or your enquiry…"
                                            className="flex w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
                                        />
                                        <InputError message={errors.message} />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-brand-300/30 transition-all hover:from-brand-700 hover:to-brand-600 hover:shadow-lg disabled:opacity-60 active:scale-95"
                                    >
                                        {processing ? <Spinner className="size-4" /> : <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
