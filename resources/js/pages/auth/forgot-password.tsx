import { Form, Head } from '@inertiajs/react';
import { ArrowRight, Mail } from 'lucide-react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />

            {status && (
                <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-green-600" />
                    <p className="text-sm font-medium text-green-700">{status}</p>
                </div>
            )}

            <p className="mb-6 text-sm leading-relaxed text-gray-500">
                Enter the email address associated with your account and we'll send you a link to
                reset your password.
            </p>

            <Form {...email.form()} className="flex flex-col gap-5">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-1.5">
                            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                placeholder="you@example.com"
                                className="h-11 rounded-xl border-gray-200 bg-gray-50 px-4 text-sm transition-colors focus:border-brand-500 focus:bg-white"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            data-test="email-password-reset-link-button"
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 py-3 text-sm font-bold text-white shadow-md shadow-brand-300/30 transition-all duration-200 hover:from-brand-700 hover:to-brand-600 hover:shadow-lg disabled:opacity-60 active:scale-[0.98]"
                        >
                            {processing ? (
                                <Spinner className="size-4" />
                            ) : (
                                <>
                                    Send reset link
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>

                        <div className="text-center">
                            <a
                                href={login()}
                                className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
                            >
                                ← Back to log in
                            </a>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Reset your password',
    description: "We'll send you a secure link to reset your password",
};
