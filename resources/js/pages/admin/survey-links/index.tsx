import { Head, router, useForm } from '@inertiajs/react';
import { Copy, ExternalLink, Pencil, Plus, QrCode, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';

type SurveyLink = {
    id: number;
    title: string;
    description: string | null;
    url: string;
    token: string;
    is_active: boolean;
    public_url: string;
    created_at: string;
};

type FormData = {
    title: string;
    description: string;
    url: string;
    is_active: boolean;
};

function QrCodeImage({ url, size = 200 }: { url: string; size?: number }) {
    const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&margin=10`;
    return (
        <img
            src={qrSrc}
            alt="QR Code"
            width={size}
            height={size}
            className="rounded-lg border border-gray-100"
        />
    );
}

function SurveyLinkFormDialog({
    open,
    onClose,
    editLink,
}: {
    open: boolean;
    onClose: () => void;
    editLink?: SurveyLink;
}) {
    const isEdit = !!editLink;
    const { data, setData, post, put, processing, errors, reset } = useForm<FormData>({
        title: editLink?.title ?? '',
        description: editLink?.description ?? '',
        url: editLink?.url ?? '',
        is_active: editLink?.is_active ?? true,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/survey-links/${editLink!.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post('/admin/survey-links', {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="overflow-hidden rounded-2xl p-0 shadow-2xl sm:max-w-lg">
                <div className="bg-gradient-to-br from-brand-700 to-brand-500 px-6 py-5 text-white">
                    <DialogHeader>
                        <DialogTitle
                            className="text-lg font-extrabold text-white"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            {isEdit ? 'Edit Survey Link' : 'Create Survey Link'}
                        </DialogTitle>
                        <p className="mt-0.5 text-sm text-brand-200">
                            Paste a Google Form or any survey URL — a QR code will be generated automatically.
                        </p>
                    </DialogHeader>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
                    <div className="grid gap-1.5">
                        <Label className="text-sm font-semibold text-gray-700">Title</Label>
                        <Input
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="e.g. Post-Session Feedback — Day 1"
                            className="h-10 rounded-xl border-gray-200 bg-gray-50"
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-1.5">
                        <Label className="text-sm font-semibold text-gray-700">
                            Description <span className="font-normal text-gray-400">(optional)</span>
                        </Label>
                        <Input
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Brief note about this survey"
                            className="h-10 rounded-xl border-gray-200 bg-gray-50"
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="grid gap-1.5">
                        <Label className="text-sm font-semibold text-gray-700">Survey URL</Label>
                        <Input
                            value={data.url}
                            onChange={(e) => setData('url', e.target.value)}
                            placeholder="https://forms.google.com/..."
                            className="h-10 rounded-xl border-gray-200 bg-gray-50"
                            type="url"
                        />
                        <InputError message={errors.url} />
                    </div>

                    {isEdit && (
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 select-none">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 accent-brand-600"
                            />
                            <span>Active <span className="text-gray-400">(inactive links will return a 404)</span></span>
                        </label>
                    )}

                    <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-md disabled:opacity-60"
                        >
                            {processing && <Spinner className="size-3.5" />}
                            {isEdit ? 'Save Changes' : 'Create Link'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function QrCodeDialog({ link, onClose }: { link: SurveyLink; onClose: () => void }) {
    const qrDownloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(link.public_url)}&margin=10&format=png`;

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text);
    }

    return (
        <Dialog open onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="overflow-hidden rounded-2xl p-0 shadow-2xl sm:max-w-sm">
                <div className="bg-gradient-to-br from-brand-700 to-brand-500 px-6 py-5 text-white">
                    <DialogHeader>
                        <DialogTitle
                            className="text-lg font-extrabold text-white"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            QR Code
                        </DialogTitle>
                        <p className="mt-0.5 text-sm text-brand-200 truncate">{link.title}</p>
                    </DialogHeader>
                </div>

                <div className="flex flex-col items-center gap-4 px-6 py-6">
                    <QrCodeImage url={link.public_url} size={220} />

                    <div className="w-full space-y-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Redirect URL</p>
                        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
                            <span className="flex-1 truncate text-xs text-gray-700">{link.public_url}</span>
                            <button
                                onClick={() => copyToClipboard(link.public_url)}
                                className="shrink-0 text-brand-500 hover:text-brand-700"
                                title="Copy link"
                            >
                                <Copy className="size-3.5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex w-full gap-2">
                        <a
                            href={qrDownloadUrl}
                            download={`qr-${link.token}.png`}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-100"
                        >
                            Download QR
                        </a>
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            <ExternalLink className="size-3.5" />
                            Open Form
                        </a>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default function AdminSurveyLinksIndex({ surveyLinks }: { surveyLinks: SurveyLink[] }) {
    const [createOpen, setCreateOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<SurveyLink | null>(null);
    const [qrTarget, setQrTarget] = useState<SurveyLink | null>(null);

    function handleDelete(link: SurveyLink) {
        if (!confirm(`Delete "${link.title}"? The QR code will stop working.`)) return;
        router.delete(`/admin/survey-links/${link.id}`, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Survey QR Codes — Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600">
                            <QrCode className="size-5 text-white" />
                        </div>
                        <div>
                            <h1
                                className="text-2xl font-extrabold text-gray-900"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                Survey QR Codes
                            </h1>
                            <p className="text-sm text-gray-500">
                                Generate QR codes that link applicants to post-session surveys
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setCreateOpen(true)}
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-md hover:bg-brand-700 active:scale-95"
                    >
                        <Plus className="size-4" /> New Survey Link
                    </button>
                </div>

                {/* How it works banner */}
                <div className="rounded-2xl border border-brand-100 bg-brand-50 px-5 py-4">
                    <p className="text-sm font-semibold text-brand-800">How it works</p>
                    <p className="mt-1 text-sm text-brand-700">
                        Create a survey link by pasting a Google Form URL (or any survey URL). A unique QR code is generated — display it at the end of each session so applicants can scan and fill in the feedback form.
                    </p>
                </div>

                {/* Survey links list */}
                {surveyLinks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-16 text-center">
                        <QrCode className="mx-auto mb-3 size-10 text-gray-300" />
                        <p className="text-sm font-semibold text-gray-500">No survey links yet</p>
                        <p className="mt-1 text-xs text-gray-400">Create one to generate your first QR code.</p>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <ul className="divide-y divide-gray-50">
                            {surveyLinks.map((link) => (
                                <li key={link.id} className="flex items-center gap-4 px-6 py-4">
                                    {/* Mini QR preview */}
                                    <button
                                        onClick={() => setQrTarget(link)}
                                        className="shrink-0 overflow-hidden rounded-lg border border-gray-100 transition-opacity hover:opacity-80"
                                        title="View QR code"
                                    >
                                        <QrCodeImage url={link.public_url} size={56} />
                                    </button>

                                    {/* Info */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-gray-900">{link.title}</span>
                                            {!link.is_active && (
                                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                                                    Inactive
                                                </span>
                                            )}
                                        </div>
                                        {link.description && (
                                            <p className="mt-0.5 text-xs text-gray-400">{link.description}</p>
                                        )}
                                        <p className="mt-0.5 truncate text-xs text-gray-400">{link.url}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex shrink-0 items-center gap-1.5">
                                        <button
                                            onClick={() => setQrTarget(link)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-brand-500 hover:bg-brand-50"
                                            title="View QR code"
                                        >
                                            <QrCode className="size-4" />
                                        </button>
                                        <button
                                            onClick={() => setEditTarget(link)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                                            title="Edit"
                                        >
                                            <Pencil className="size-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(link)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600"
                                            title="Delete"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <SurveyLinkFormDialog open={createOpen} onClose={() => setCreateOpen(false)} />
            {editTarget && (
                <SurveyLinkFormDialog open onClose={() => setEditTarget(null)} editLink={editTarget} />
            )}
            {qrTarget && <QrCodeDialog link={qrTarget} onClose={() => setQrTarget(null)} />}
        </>
    );
}

AdminSurveyLinksIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/applications' },
        { title: 'Survey QR Codes', href: '/admin/survey-links' },
    ],
};
