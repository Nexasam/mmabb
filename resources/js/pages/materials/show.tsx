import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Download } from 'lucide-react';
import type { Material } from '@/types';

export default function MaterialShow({ material }: { material: Material }) {
    return (
        <>
            <Head title={material.title} />

            <div className="flex h-full flex-1 flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/my-materials"
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                        >
                            <ArrowLeft className="size-4" />
                        </Link>
                        <div>
                            <h1 className="text-sm font-semibold text-slate-900">{material.title}</h1>
                            <p className="text-xs text-slate-500">PDF Document</p>
                        </div>
                    </div>
                    <a
                        href={`/materials/${material.id}/download`}
                        className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        <Download className="size-4" />
                        Download
                    </a>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 bg-slate-100">
                    <iframe
                        src={`/materials/${material.id}`}
                        className="h-full w-full border-0"
                        title={material.title}
                    />
                </div>
            </div>
        </>
    );
}

MaterialShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Materials', href: '/my-materials' },
        { title: 'View Material', href: '#' },
    ],
};
