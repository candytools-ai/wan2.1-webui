import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Copy, CopyCheck } from "lucide-react";

export function ButtonCopy({
    children,
    loading = false,
    content,
    className = "",
    ...props
}: any) {
    const { isCopied, copyToClipboard } = useCopyToClipboard({
        timeout: 2000,
    });

    const onCopy = async (event: any) => {
        event.preventDefault();
        if (isCopied) return;
        copyToClipboard(content);
    };

    return (
        <Button disabled={loading} onClick={onCopy} {...props}>
            {isCopied ? <CopyCheck size={16} /> : <Copy size={16} />}
            {children}
        </Button>
    );
}
