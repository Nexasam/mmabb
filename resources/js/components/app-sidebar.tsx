import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    ClipboardList,
    ClipboardCheck,
    Globe,
    LayoutGrid,
    LayoutTemplate,
    Mail,
    MessageSquare,
    QrCode,
    Settings2,
    Users2,
} from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { Auth, NavItem } from '@/types';

const footerNavItems: NavItem[] = [
    { title: 'Browse Courses', href: '/courses', icon: Globe },
    { title: 'Contact Us',     href: '/contact', icon: Mail  },
];

export function AppSidebar() {
    const { auth } = usePage<{ auth: Auth }>().props;

    const mainNavItems: NavItem[] = [
        { title: 'Dashboard',       href: dashboard(),        icon: LayoutGrid   },
        { title: 'My Applications', href: '/my-applications', icon: ClipboardList },
        ...(auth.hasApprovedApplication
            ? [
                  { title: 'My Materials',   href: '/my-materials',   icon: BookOpen      },
                  { title: 'My Assessments', href: '/my-assessments', icon: ClipboardCheck },
              ]
            : []),
    ];

    const adminNavItems: NavItem[] = auth.isAdmin
        ? [
              { title: 'Applications', href: '/admin/applications', icon: Users2        },
              { title: 'Courses',      href: '/admin/courses',      icon: BookOpen      },
              { title: 'Materials',    href: '/admin/materials',    icon: Settings2     },
              { title: 'Assessments',  href: '/admin/assessments',  icon: ClipboardCheck },
              { title: 'Enquiries',    href: '/admin/enquiries',    icon: MessageSquare },
              { title: 'Survey QR',    href: '/admin/survey-links', icon: QrCode        },
              { title: 'Landing Page', href: '/admin/page-content', icon: LayoutTemplate },
          ]
        : [];

    return (
        <Sidebar collapsible="icon" variant="sidebar" className="border-r border-slate-200">

            {/* ── Logo header ── */}
            <SidebarHeader className="h-16 border-b border-slate-200 bg-white p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="group/logo h-auto p-0 hover:bg-transparent"
                        >
                            <Link href={dashboard()} prefetch className="flex items-center gap-3">
                                {/* Logo */}
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-brand-600">
                                    <img
                                        src="/images/logo.webp"
                                        alt="MMAB"
                                        className="h-6 w-auto object-contain brightness-0 invert"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-slate-900">
                                        MMAB Consulting
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        Healthcare Training
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* ── Navigation ── */}
            <SidebarContent className="bg-white p-3">
                <NavMain items={mainNavItems} label="Main" />

                {auth.isAdmin && adminNavItems.length > 0 && (
                    <>
                        <div className="my-4 h-px bg-slate-200" />
                        <NavMain items={adminNavItems} label="Administration" />
                    </>
                )}
            </SidebarContent>

            {/* ── Footer ── */}
            <SidebarFooter className="border-t border-slate-200 bg-white p-3">
                <NavFooter items={footerNavItems} className="mt-0" />
                <div className="my-3 h-px bg-slate-200" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
