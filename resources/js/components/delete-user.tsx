import { Form } from '@inertiajs/react';
import { useRef } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);

    return (
        <div className="space-y-6">
            <Heading
                variant="small"
                title="Delete account"
                description="Delete your account and all of its resources"
            />
            <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                    <p className="font-medium">Warning</p>
                    <p className="text-sm">
                        Please proceed with caution, this cannot be undone.
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive" data-test="delete-user-button">
                            Delete account
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="overflow-hidden rounded-2xl p-0 shadow-2xl sm:max-w-md">
                        {/* Red header */}
                        <div className="bg-gradient-to-br from-red-600 to-red-500 px-6 py-5 text-white">
                            <DialogTitle className="text-lg font-extrabold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Delete your account?
                            </DialogTitle>
                            <p className="mt-1 text-sm text-red-100">
                                This action is permanent and cannot be undone.
                            </p>
                        </div>

                        <div className="px-6 py-5">
                            <div className="mb-5 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                                Once your account is deleted, all of your data, applications, and course materials will be permanently removed. Please enter your password to confirm.
                            </div>

                            <Form
                                {...ProfileController.destroy.form()}
                                options={{ preserveScroll: true }}
                                onError={() => passwordInput.current?.focus()}
                                resetOnSuccess
                                className="space-y-4"
                            >
                                {({ resetAndClearErrors, processing, errors }) => (
                                    <>
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                                Confirm your password
                                            </Label>
                                            <PasswordInput
                                                id="password"
                                                name="password"
                                                ref={passwordInput}
                                                placeholder="Enter your password"
                                                autoComplete="current-password"
                                                className="h-11 rounded-xl border-gray-200 bg-gray-50 focus:border-red-500 focus:bg-white"
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
                                            <DialogClose asChild>
                                                <Button
                                                    variant="secondary"
                                                    className="rounded-xl"
                                                    onClick={() => resetAndClearErrors()}
                                                >
                                                    Cancel
                                                </Button>
                                            </DialogClose>
                                            <Button
                                                variant="destructive"
                                                disabled={processing}
                                                className="rounded-xl bg-gradient-to-r from-red-600 to-red-500 shadow-md shadow-red-300/30 hover:from-red-700 hover:to-red-600"
                                                asChild
                                            >
                                                <button type="submit" data-test="confirm-delete-user-button">
                                                    Delete account
                                                </button>
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
