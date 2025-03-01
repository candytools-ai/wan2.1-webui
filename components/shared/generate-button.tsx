import { LoaderCircle, Sparkles } from "lucide-react";
// import { Sparkles } from "@/components/ui/icons/sparkles";
// import { CreditsIcon } from "@/components/ui/icons/creditsIcon";
import { cn } from "@/lib/utils";
import { CreditsIcon } from "./icons";
import { RoundSpinner } from "../ui/spinner";

export function GenerateButton({
    children,
    icon,
    loading = false,
    className = "",
    onClick = () => {},
    credits,
}: any) {
    return (
        <>
            <button
                className={cn(
                    // "bg-gradient-to-r from-indigo-500 to-pink-500 border-none rounded-xl",
                    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-primary-foreground hover:from-rose-400/90 hover:to-indigo-500/90 h-10 px-4 py-2 w-full",
                    "rounded-xl py-2 px-3 disabled:opacity-50 disabled:pointer-events-none",
                    className
                )}
                disabled={loading}
                onClick={onClick}
            >
                {loading ? (
                    <div className="flex justify-center items-center">
                        <RoundSpinner size="sm" color="white" />
                    </div>
                ) : (
                    <div className="flex justify-center items-center gap-1">
                        {icon && (
                            <Sparkles className="text-white size-[14px]" />
                        )}
                        <span className="text-sm font-semibold  text-white">
                            {children}
                        </span>
                        {credits && (
                            <>
                                <div className="h-[10px] w-[1px] bg-white/50 rounded-full"></div>
                                <div className="flex items-center">
                                    <CreditsIcon className="text-[#ffcc55]" />
                                    <span className="text-xs text-[#ffcc55] font-medium">
                                        {credits}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </button>
        </>
    );
}
