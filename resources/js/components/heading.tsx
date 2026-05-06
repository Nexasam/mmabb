export default function Heading({
    title,
    description,
    variant = 'default',
}: {
    title: string;
    description?: string;
    variant?: 'default' | 'small';
}) {
    return (
        <header className={variant === 'small' ? '' : 'mb-8 space-y-0.5'}>
            <h2
                className={
                    variant === 'small'
                        ? 'mb-0.5 text-base font-semibold text-[#1c1b4a]'
                        : 'text-xl font-bold tracking-tight text-[#1c1b4a]'
                }
            >
                {title}
            </h2>
            {description && (
                <p className="text-sm font-medium text-[#5a5980]">{description}</p>
            )}
        </header>
    );
}
