/* eslint-disable @next/next/no-img-element */
"use client";

import { Model } from "@/config/models-video";
import { useTheme } from "next-themes";

export function AIModelIcon({ model }: { model: Model }) {
    const { theme } = useTheme();
    
    return (
        <img src={model.image[theme as "light" | "dark" || "light"]} alt={model.label} className="w-full" />
    );
}
