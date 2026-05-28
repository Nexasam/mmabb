import { Form, Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({ status, canResetPassword, canRegister }: Props) {
    return (
        <>
            <Head title="Log in" />

            {status && (
                <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    {status}
                </div>
            )}

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        {/* Email */}
                        <div className="grid gap-1.5">
                            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                placeholder="you@example.com"
                                className="h-11 rounded-xl border-gray-200 bg-gray-50 px-4 text-sm transition-colors focus:border-brand-500 focus:bg-white focus:ring-brand-500/20"
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Password */}
                        <div className="grid gap-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                    Password
                                </Label>
                                {canResetPassword && (
                                    <TextLink
                                        href={request()}
                                        className="text-xs font-medium text-brand-600 hover:text-brand-700"
                                        tabIndex={5}
                                    >
                                        Forgot password?
                                    </TextLink>
                                )}
                            </div>
                            <PasswordInput
                                id="password"
                                name="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="h-11 rounded-xl border-gray-200 bg-gray-50 px-4 text-sm transition-colors focus:border-brand-500 focus:bg-white"
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center gap-2.5">
                            <Checkbox id="remember" name="remember" tabIndex={3} />
                            <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                                Keep me signed in
                            </Label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            tabIndex={4}
                            disabled={processing}
                            className="group mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 py-3 text-sm font-bold text-white shadow-md shadow-brand-300/30 transition-all duration-200 hover:from-brand-700 hover:to-brand-600 hover:shadow-lg disabled:opacity-60 active:scale-[0.98]"
                        >
                            {processing ? (
                                <Spinner className="size-4" />
                            ) : (
                                <>
                                    Log in to your account
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        {canRegister && (
                            <div className="relative my-1">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-100" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-white px-3 text-xs text-gray-400">
                                        New to MMAB?
                                    </span>
                                </div>
                            </div>
                        )}

                        {canRegister && (
                            <Link
                                href={register()}
                                className="flex w-full items-center justify-center rounded-xl border border-brand-200 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                            >
                                Create a free account
                            </Link>
                        )}
                    </>
                )}
            </Form>
        </>
    );
}

Login.layout = {
    title: 'Welcome back',
    description: 'Log in to access your training materials and applications',
};
