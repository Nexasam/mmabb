import { Head, router } from '@inertiajs/react';
import { ChevronDown, ChevronUp, LayoutTemplate, Save } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type ContentItem = {
    id: number;
    page: string;
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'json';
    value: string | null;
};

type Grouped = Record<string, ContentItem[]>;

const PAGE_LABELS: Record<string, string> = {
    global: 'Global / Site-Wide',
    home: 'Home Page',
    about: 'About Page',
    contact: 'Contact Page',
};

// ─── JSON pretty-editor ───────────────────────────────────────────────────────

function JsonEditor({
    value,
    onChange,
}: {
    value: string;
    onChange: (v: string) => void;
}) {
    const [error, setError] = useState<string | null>(null);

    function handleChange(raw: string) {
        onChange(raw);
        try {
            JSON.parse(raw);
            setError(null);
        } catch {
            setError('Invalid JSON');
        }
    }

    return (
        <div className="space-y-1">
            <textarea
                rows={8}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                spellCheck={false}
                className={`w-full resize-y rounded-xl border bg-gray-50 px-3 py-2.5 font-mono text-xs text-gray-800 outline-none transition-colors focus:bg-white focus:ring-2 ${
                    error
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20'
                        : 'border-gray-200 focus:border-brand-400 focus:ring-brand-400/20'
                }`}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <p className="text-xs text-gray-400">Edit as JSON. Changes save with the section.</p>
        </div>
    );
}

// ─── Single field ─────────────────────────────────────────────────────────────

function ContentField({
    item,
    value,
    onChange,
}: {
    item: ContentItem;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="grid gap-1.5">
            <Label className="text-sm font-semibold text-gray-700">{item.label}</Label>
            {item.type === 'text' && (
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-10 rounded-xl border-gray-200 bg-gray-50 focus:border-brand-400 focus:bg-white"
                />
            )}
            {item.type === 'textarea' && (
                <textarea
                    rows={3}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-400/20"
                />
            )}
            {item.type === 'json' && (
                <JsonEditor value={value} onChange={onChange} />
            )}
            <p className="text-xs text-gray-400 font-mono">{item.key}</p>
        </div>
    );
}

// ─── Section card ─────────────────────────────────────────────────────────────

function PageSection({
    page,
    items,
}: {
    page: string;
    items: ContentItem[];
}) {
    const [open, setOpen] = useState(true);
    const [values, setValues] = useState<Record<number, string>>(() => {
        const map: Record<number, string> = {};
        items.forEach((item) => { map[item.id] = item.value ?? ''; });
        return map;
    });
    const [saving, setSaving] = useState(false);

    function handleSave() {
        setSaving(true);
        router.post(
            '/admin/page-content/bulk',
            {
                items: items.map((item) => ({
                    id: item.id,
                    value: values[item.id] ?? '',
                })),
            },
            {
                preserveScroll: true,
                onFinish: () => setSaving(false),
            },
        );
    }

    const isDirty = items.some((item) => (item.value ?? '') !== (values[item.id] ?? ''));

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* Header */}
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between border-b border-gray-50 bg-gradient-to-r from-brand-50 to-white px-6 py-4 text-left"
            >
                <div className="flex items-center gap-3">
                    <h3 className="font-bold text-gray-900">
                        {PAGE_LABELS[page] ?? page}
                    </h3>
                    {isDirty && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                            Unsaved changes
                        </span>
                    )}
                </div>
                {open ? (
                    <ChevronUp className="size-4 text-gray-400" />
                ) : (
                    <ChevronDown className="size-4 text-gray-400" />
                )}
            </button>

            {/* Fields */}
            {open && (
                <div className="space-y-5 px-6 py-5">
                    {items.map((item) => (
                        <ContentField
                            key={item.id}
                            item={item}
                            value={values[item.id] ?? ''}
                            onChange={(v) => setValues((prev) => ({ ...prev, [item.id]: v }))}
                        />
                    ))}

                    <div className="flex justify-end border-t border-gray-100 pt-4">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving || !isDirty}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-md disabled:opacity-50"
                        >
                            {saving ? <Spinner className="size-3.5" /> : <Save className="size-3.5" />}
                            Save {PAGE_LABELS[page] ?? page}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPageContentIndex({ grouped }: { grouped: Grouped }) {
    const pageOrder = ['global', 'home', 'about', 'contact'];
    const pages = [
        ...pageOrder.filter((p) => grouped[p]),
        ...Object.keys(grouped).filter((p) => !pageOrder.includes(p)),
    ];

    return (
        <>
            <Head title="Page Content — Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600">
                        <LayoutTemplate className="size-5 text-white" />
                    </div>
                    <div>
                        <h1
                            className="text-2xl font-extrabold text-gray-900"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Page Content
                        </h1>
                        <p className="text-sm text-gray-500">
                            Edit the text and content shown on the public-facing pages
                        </p>
                    </div>
                </div>

                {/* Info banner */}
                <div className="rounded-2xl border border-brand-100 bg-brand-50 px-5 py-4">
                    <p className="text-sm font-semibold text-brand-800">How to use</p>
                    <p className="mt-1 text-sm text-brand-700">
                        Edit any field below and click <strong>Save</strong> for that section. Changes go live immediately on the website. JSON fields control lists of items — edit carefully and keep the structure intact.
                    </p>
                </div>

                {/* Sections */}
                {pages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-16 text-center">
                        <p className="text-sm text-gray-400">No page content found. Run the PageContentSeeder to populate defaults.</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {pages.map((page) => (
                            <PageSection key={page} page={page} items={grouped[page]} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

AdminPageContentIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/applications' },
        { title: 'Page Content', href: '/admin/page-content' },
    ],
};
