import { Form, Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <>
            <Head title="Register" />

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        {/* Name */}
                        <div className="grid gap-1.5">
                            <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                                Full name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                name="name"
                                placeholder="Jane Smith"
                                className="h-11 rounded-xl border-gray-200 bg-gray-50 px-4 text-sm transition-colors focus:border-brand-500 focus:bg-white"
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* Email */}
                        <div className="grid gap-1.5">
                            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                name="email"
                                placeholder="you@example.com"
                                className="h-11 rounded-xl border-gray-200 bg-gray-50 px-4 text-sm transition-colors focus:border-brand-500 focus:bg-white"
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Password */}
                        <div className="grid gap-1.5">
                            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                Password
                            </Label>
                            <PasswordInput
                                id="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                name="password"
                                placeholder="••••••••"
                                className="h-11 rounded-xl border-gray-200 bg-gray-50 px-4 text-sm transition-colors focus:border-brand-500 focus:bg-white"
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Confirm password */}
                        <div className="grid gap-1.5">
                            <Label htmlFor="password_confirmation" className="text-sm font-semibold text-gray-700">
                                Confirm password
                            </Label>
                            <PasswordInput
                                id="password_confirmation"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                name="password_confirmation"
                                placeholder="••••••••"
                                className="h-11 rounded-xl border-gray-200 bg-gray-50 px-4 text-sm transition-colors focus:border-brand-500 focus:bg-white"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            tabIndex={5}
                            disabled={processing}
                            data-test="register-user-button"
                            className="group mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 py-3 text-sm font-bold text-white shadow-md shadow-brand-300/30 transition-all duration-200 hover:from-brand-700 hover:to-brand-600 hover:shadow-lg disabled:opacity-60 active:scale-[0.98]"
                        >
                            {processing ? (
                                <Spinner className="size-4" />
                            ) : (
                                <>
                                    Create my account
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative my-1">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white px-3 text-xs text-gray-400">
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        <Link
                            href={login()}
                            className="flex w-full items-center justify-center rounded-xl border border-brand-200 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                        >
                            Log in instead
                        </Link>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Create your account',
    description: 'Join MMAB Consulting to access specialist healthcare training',
};
