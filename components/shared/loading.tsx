import { cn } from "@/lib/utils";

export function Loading({
    loading,
    text,
    size,
}: {
    loading: boolean;
    text?: string;
    size?: string;
}) {
    return (
        <div className={loading ? "" : "hidden"}>
            <div className="absolute top-0 start-0 size-full bg-white/50 rounded-lg dark:bg-neutral-800/40"></div>

            <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div
                    className={cn(
                        "animate-spin inline-block border-[3px] border-current border-t-transparent text-purple-600 rounded-full dark:text-purple-500",
                        size || "size-6"
                    )}
                    role="status"
                    aria-label="loading"
                >
                </div>

                {text && (
                    <div className="text-gray-500 dark:text-neutral-500">
                        {text}
                    </div>
                )}
            </div>
        </div>
    );
}
