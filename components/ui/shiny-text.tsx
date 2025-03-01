import { cn } from "@/lib/utils";

interface ShinyTextProps {
    children: React.ReactNode;
    disabled?: boolean;
    speed?: number;
    className?: string;
}

export function ShinyText({
    children,
    disabled = false,
    speed = 5,
    className,
}: ShinyTextProps) {
    return (
        <div
            className={cn(
                "inline-block bg-clip-text text-transparent",
                "bg-gradient-to-r from-foreground/50 to-foreground/50",
                !disabled && "animate-shine",
                className
            )}
            style={
                {
                    backgroundImage: `linear-gradient(120deg, var(--shine-start) 40%, var(--shine-middle) 50%, var(--shine-end) 60%)`,
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    animationDuration: `${speed}s`,
                    "--shine-start": "hsl(var(--foreground)/0.5)",
                    "--shine-middle": "hsl(var(--foreground))",
                    "--shine-end": "hsl(var(--foreground)/0.5)",
                } as React.CSSProperties
            }
        >
            {children}
        </div>
    );
}
