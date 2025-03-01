import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export function ButtonLoading({
    children,
    loading = false,
    className = "",
    onClick = () => {},
    ...props
}: any) {
    const icon = typeof children === "string" ? false : true;

    return (
        <Button disabled={loading} onClick={onClick} {...props} className={cn(className || "")}>
            <>
                {loading ? (
                    <>
                        <LoaderCircle className="w-4 h-4 animate-spin" />
                        {icon ? children[1] : children}
                    </>
                ) : (
                    <>{children}</>
                )}
            </>
        </Button>
    );
}
