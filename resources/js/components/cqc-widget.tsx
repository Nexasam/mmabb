import { Award } from 'lucide-react';

/**
 * CQC Widget — displays MMAB Healthcare CQC rating information
 * Location: 1-15528561702 (MMAB Healthcare)
 * Rating: Good
 * Date: 31 July 2025
 */
export function CqcWidget() {
    return (
        <div className="flex items-center gap-4 rounded-xl border-2 border-brand-200 bg-white p-4 shadow-sm">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-100">
                <svg className="h-10 w-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            </div>
            <div>
                <div className="text-xs font-medium uppercase tracking-wide text-gray-500">CQC overall rating</div>
                <div className="text-2xl font-bold text-green-600">Good</div>
                <div className="text-xs text-gray-500">31 July 2025</div>
                <a
                    href="https://www.cqc.org.uk/location/1-15528561702"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 underline underline-offset-2"
                >
                    See the report →
                </a>
            </div>
        </div>
    );
}
