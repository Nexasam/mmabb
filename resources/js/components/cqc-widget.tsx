import { useEffect, useRef } from 'react';

/**
 * CQC Widget — dynamically loads the official CQC widget script
 * for location 1-15528561702 (MMAB Healthcare).
 *
 * The script must be loaded via useEffect because JSX <script> tags
 * do not execute in a React SPA.
 */
export function CqcWidget() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptLoadedRef = useRef(false);

    useEffect(() => {
        // Only load once
        if (scriptLoadedRef.current) return;

        const locationId = '1-15528561702';
        const scriptId = 'cqc-widget-script';

        // Check if script already exists (e.g., in case of HMR)
        if (document.getElementById(scriptId)) {
            scriptLoadedRef.current = true;
            return;
        }

        // Create and inject the CQC widget script
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://www.cqc.org.uk/sites/all/modules/custom/cqc_widget/widget.js?data-id=${locationId}&data-host=https://www.cqc.org.uk&type=location`;
        script.async = true;
        script.defer = true;

        document.body.appendChild(script);
        scriptLoadedRef.current = true;

        return () => {
            // Cleanup on unmount (optional — usually not needed for widgets)
            const existingScript = document.getElementById(scriptId);
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            id="cqc-widget"
            data-id="1-15528561702"
            data-host="https://www.cqc.org.uk"
            className="cqc-widget-container"
        />
    );
}
