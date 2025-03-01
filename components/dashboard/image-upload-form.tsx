/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useImageUpload } from "@/hooks/use-image-upload";
import { FormHeader } from "@/components/dashboard/form-header";
import { RoundSpinner } from "../ui/spinner";
import { toast } from "sonner";

interface FormParams {
    title: string;
    placeholder: string;
    description: string;
    tips?: string;
    imageSrc: string;
    handleImageSrcChange: any;
}

export function ImageUploadForm({
    title,
    placeholder,
    description,
    tips,
    imageSrc,
    handleImageSrcChange,
}: FormParams) {
    const [uploading, setUploading] = useState(false);

    const {
        previewUrl,
        fileName,
        fileInputRef,
        handleThumbnailClick,
        handleFileChange,
        handleRemove,
    } = useImageUpload({
        url: imageSrc,
        onUpload: (file) => {
            console.log("Uploaded image file:", file);
            onUpload(file);
        },
    });

    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            const file = e.dataTransfer.files?.[0];
            if (file && file.type.startsWith("image/")) {
                const fakeEvent: any = {
                    target: {
                        files: [file],
                    },
                };
                handleFileChange(fakeEvent);
            }
        },
        [handleFileChange]
    );

    // upload file
    const onUpload = async (file: any) => {
        setUploading(true);
        const formData = new FormData();
        // acceptedFiles.map((file: Blob) => {
        // console.info("file", file);
        // setImageSrc(URL.createObjectURL(file));

        // mock start
        // setTimeout(() => {
        //     setUploading(false);
        //     // onImageSrcChange(URL.createObjectURL(file))
        // }, 5000);
        // return;
        // mock end

        formData.append("file", file);
        // });
        formData.append("file_path", "/image-to-video");

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                toast.success("Upload successful!");
                handleImageSrcChange(data.url);
            } else {
                const { message } = await response.json();
                console.error("upload failed:", message);
                handleRemove();
                handleImageSrcChange("");
                toast.error(message);
            }
            setUploading(false);
        } catch (error) {
            console.error("upload error:", error);
            toast.error("upload error!");
            setUploading(false);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-y-1.5 pb-5">
                <FormHeader title={title} tips={tips} />
                <div className="flex flex-col">
                    <div
                        className={cn(
                            "w-full max-w-4xl mx-auto relative",
                            // "bg-white dark:bg-neutral-800",
                            "rounded-3xl"
                        )}
                    >
                        <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />

                        {!previewUrl ? (
                            <div
                                onClick={handleThumbnailClick}
                                onDragOver={handleDragOver}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={cn(
                                    "flex h-32 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-muted-foreground/25 bg-muted/70 transition-colors hover:bg-muted",
                                    isDragging &&
                                        "border-primary/50 bg-primary/5"
                                )}
                            >
                                <div className="rounded-full p-2 bg-card">
                                    <ImagePlus className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div className="text-center text-xs font-semibold">
                                    {placeholder}
                                </div>
                                {/* <div className="text-xs text-center font-medium text-muted-foreground">
                                    Support: JPG, PNG, WEBP | Max file size 10MB
                                </div> */}
                            </div>
                        ) : (
                            <div className="relative">
                                <div
                                    className={cn(
                                        "group relative h-32 overflow-hidden rounded-xl border"
                                    )}
                                >
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="object-contain h-full w-auto mx-auto transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
                                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={handleThumbnailClick}
                                            className="h-9 w-9 p-0"
                                        >
                                            <Upload className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => {
                                                handleRemove();
                                                handleImageSrcChange("");
                                            }}
                                            className="h-9 w-9 p-0"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                {/* {fileName && (
                                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="truncate">{fileName}</span>
                                    <button
                                        onClick={handleRemove}
                                        className="ml-auto rounded-full p-1 hover:bg-muted"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )} */}
                            </div>
                        )}
                        {uploading && (
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-2">
                                <div className="absolute top-0 start-0 size-full bg-primary/20 rounded-3xl"></div>
                                <RoundSpinner size="lg" color="primary" />
                            </div>
                        )}
                    </div>
                    <div className="text-muted-foreground text-xs mt-2">
                        {description}
                    </div>
                </div>
            </div>
        </>
    );
}
