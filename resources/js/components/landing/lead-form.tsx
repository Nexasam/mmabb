import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LeadForm() {
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);
    }

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center rounded-2xl bg-brand-50 px-8 py-14 text-center"
            >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 shadow-lg">
                    <CheckCircle className="size-8 text-white" />
                </div>
                <h3 className="mb-2 font-heading text-xl font-bold text-gray-900">Thank you!</h3>
                <p className="text-sm text-gray-500">
                    We've received your enquiry and will be in touch within 24 hours.
                </p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Free consultation request form">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                    <Label htmlFor="lead-name" className="text-sm font-medium text-gray-700">
                        Full Name <span className="text-red-500" aria-hidden>*</span>
                    </Label>
                    <Input
                        id="lead-name"
                        name="name"
                        placeholder="Jane Smith"
                        required
                        autoComplete="name"
                        className="border-gray-200 bg-white transition-colors focus:border-brand-500"
                    />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="lead-email" className="text-sm font-medium text-gray-700">
                        Email Address <span className="text-red-500" aria-hidden>*</span>
                    </Label>
                    <Input
                        id="lead-email"
                        name="email"
                        type="email"
                        placeholder="jane@example.com"
                        required
                        autoComplete="email"
                        className="border-gray-200 bg-white transition-colors focus:border-brand-500"
                    />
                </div>
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="lead-phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                </Label>
                <Input
                    id="lead-phone"
                    name="phone"
                    type="tel"
                    placeholder="+44 7700 000000"
                    autoComplete="tel"
                    className="border-gray-200 bg-white transition-colors focus:border-brand-500"
                />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="lead-interest" className="text-sm font-medium text-gray-700">
                    Area of Interest
                </Label>
                <select
                    id="lead-interest"
                    name="interest"
                    className="border-input bg-background focus-visible:border-brand-500 focus-visible:ring-brand-500/30 flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                >
                    <option value="">Select a course…</option>
                    <option value="paediatric-complex-care">Paediatric Complex Care (3-Day)</option>
                    <option value="team-training">Team / Organisation Training</option>
                    <option value="other">Other Enquiry</option>
                </select>
            </div>
            <Button
                type="submit"
                size="lg"
                className="group w-full bg-brand-600 font-semibold text-white hover:bg-brand-700 active:scale-95 transition-all duration-200"
            >
                Get a Free Consultation
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-center text-xs text-gray-400">
                We respect your privacy. No spam, ever.
            </p>
        </form>
    );
}
