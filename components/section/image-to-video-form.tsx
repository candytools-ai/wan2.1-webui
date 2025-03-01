/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useContext, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { videoPrompts } from "@/config/prompts";
import { GenerateButton } from "@/components/shared/generate-button";
import { ModelSelector } from "@/components/model-selector";
import { IGeneration, usePrediction } from "@/hooks/use-fal";
import { useSession } from "next-auth/react";
import { ModalContext } from "../modals/providers";
import { toast } from "sonner";
import { DEFAULT_MODEL, Model, models } from "@/config/models-video";
import Image from "next/image";
import { Button } from "../ui/button";
import { ImagePlus, Trash2, Upload, X } from "lucide-react";
import { Input } from "../ui/input";
import { useImageUpload } from "@/hooks/use-image-upload";
import { RoundSpinner } from "../ui/spinner";
import { useRouter } from "next/navigation";

interface FormProps {
    use?: string;
    name?: string;
    reverse?: boolean;
}

export function ImageToVideoForm({ use, name }: FormProps) {
    const { data: session } = useSession();
    const user: any = session?.user;
    const t = useTranslations(use || "Home");
    const [uploading, setUploading] = useState(false);
    const [model, setModel] = useState<Model>(DEFAULT_MODEL);
    const router = useRouter();

    const handleModelChange = (model: Model) => {
        setModel(model);
    };

    const {
        previewUrl,
        fileName,
        fileInputRef,
        handleThumbnailClick,
        handleFileChange,
        handleRemove,
    } = useImageUpload({
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

        // mock start
        // setTimeout(() => {
        //     setUploading(false);

        //     const params = new URLSearchParams();
        //     params.set("imageSrc", URL.createObjectURL(file));
        //     params.set("modelId", model.id);

        //     console.info(
        //         222,
        //         `/create/video/image-to-video?${params.toString()}`
        //     );
        //     router.push(`/create/video/image-to-video?${params.toString()}`);
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

                const params = new URLSearchParams();
                params.set("imageSrc", data.url);
                params.set("modelId", model.id);

                router.push(
                    `/create/video/image-to-video?${params.toString()}`
                );
            } else {
                const { message } = await response.json();
                console.error("upload failed:", message);
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
        <MaxWidthWrapper className="py-12">
            <div
                id="form"
                className={cn(
                    "w-full max-w-4xl mx-auto relative",
                    // "bg-white dark:bg-neutral-800",
                    // "bg-gradient",
                    "rounded-3xl shadow-xl shadow-muted"
                )}
            >
                <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                {/* <a
                    class="group p-0.5 rounded-full bg-gradient"
                    target="_blank"
                    href="/affiliate"
                >
                    <div class="px-6 py-2 w-full h-full font-black text-base bg-background/90 rounded-full group-hover:bg-background/80 transition">
                        <span class="flex items-center justify-center bg-gradient !bg-clip-text text-transparent !bg-cover !bg-center transition">
                            Earn $60 / User
                        </span>
                    </div>
                </a> */}

                {!previewUrl ? (
                    <div
                        onClick={handleThumbnailClick}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={cn(
                            "w-full max-w-4xl mx-auto p-20",
                            // "bg-white dark:bg-neutral-800",
                            "bg-background hover:bg-primary/10",
                            "rounded-3xl shadow-xl shadow-muted",
                            "flex cursor-pointer flex-col items-center justify-center gap-4 border-2 transition-colors",
                            isDragging && "border-primary/50 bg-primary/5"
                        )}
                    >
                        <div className="rounded-full bg-background p-3 shadow-sm">
                            <ImagePlus className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div className="text-center text-xl font-medium">
                            <span className="text-primary">
                                {t(`${name}.clickText`)}
                            </span>{" "}
                            <span className="">{t(`${name}.dragText`)}</span>
                        </div>
                        <div className="text-xs font-medium text-muted-foreground">
                            {t(`${name}.tips`)}
                        </div>
                    </div>
                ) : (
                    <div className="relative">
                        <div
                            className={cn(
                                // "group relative h-64 overflow-hidden rounded-lg border",
                                "group relative h-[300px] overflow-hidden",
                                "w-full max-w-4xl mx-auto p-8",
                                // "bg-white dark:bg-neutral-800",
                                "rounded-3xl shadow-xl shadow-muted"
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
                                    onClick={handleRemove}
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
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-2 overflow-hidden">
                        <div className="absolute top-0 start-0 size-full bg-primary/20 rounded-3xl"></div>
                        <RoundSpinner size="lg" color="primary" />
                    </div>
                )}
            </div>
            {/* <div className="mt-4 p-3 max-w-4xl mx-auto flex flex-col justify-center gap-1 rounded-xl bg-neutral-100 dark:bg-neutral-700">
                <div className="text-sm">
                    The <span className="text-orange-500">Goku</span> model has
                    not been released yet, but you can explore and experience
                    other available models first.
                </div>
            </div> */}
        </MaxWidthWrapper>
    );
}
