import { useCallback, useEffect, useRef, useState } from "react";

interface UseImageUploadProps {
    url?: string
    onUpload?: (file: File) => void;
}

export function useImageUpload({ url, onUpload }: UseImageUploadProps = {}) {
    const previewRef = useRef<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(url || null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleThumbnailClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                setFileName(file.name);
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
                previewRef.current = url;
                onUpload?.(file);
            }
        },
        [onUpload]
    );

    const handleRemove = useCallback(() => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setFileName(null);
        previewRef.current = null;
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [previewUrl]);

    useEffect(() => {
        return () => {
            if (previewRef.current) {
                URL.revokeObjectURL(previewRef.current);
            }
        };
    }, []);

    return {
        previewUrl,
        fileName,
        fileInputRef,
        handleThumbnailClick,
        handleFileChange,
        handleRemove,
    };
}
