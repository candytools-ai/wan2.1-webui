import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function Section({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <div
            className={cn("relative mx-auto max-w-7xl px-4 md:px-6", className)}
        >
            {children}
        </div>
    );
}
