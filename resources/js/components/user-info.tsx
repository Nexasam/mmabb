import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import type { User } from '@/types';

export function UserInfo({
    user,
    showEmail = false,
}: {
    user: User;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();
    const isAdmin = user.role === 'admin';

    return (
        <>
            {/* Avatar */}
            <Avatar className="h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-brand-200">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>

            {/* Name + email */}
            <div className="grid min-w-0 flex-1 text-left leading-tight">
                <div className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-bold text-[#1c1b4a]">
                        {user.name}
                    </span>
                    {isAdmin && (
                        <span className="shrink-0 rounded-full bg-brand-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-brand-700">
                            Admin
                        </span>
                    )}
                </div>
                {showEmail && (
                    <span className="truncate text-xs font-medium text-[#5a5980]">
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}
