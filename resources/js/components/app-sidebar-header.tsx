import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            {/* Sidebar toggle */}
            <SidebarTrigger className="-ml-1 flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900" />

            {/* Divider */}
            {breadcrumbs.length > 0 && (
                <div className="h-5 w-px bg-slate-200" />
            )}

            {/* Breadcrumbs */}
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </header>
    );
}
