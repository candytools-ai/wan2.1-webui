import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Order } from "@/db/schema";
import { pricingData } from "@/config/subscriptions";
import { URLSearchParams } from "url";
import { Model } from "@/config/models-video";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ApplicationError extends Error {
    info: string;
    status: number;
}

export const fetcher = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
        const error = new Error(
            "An error occurred while fetching the data."
        ) as ApplicationError;

        error.info = await res.json();
        error.status = res.status;

        throw error;
    }

    return res.json();
};

// 统一对 get 方法进行封装
export const get = async (url: string, data = {}) => {
    const res = await fetch(url);

    if (!res.ok) {
        const error = new Error(
            "An error occurred while fetching the data."
        ) as ApplicationError;

        error.message = await res.json();
        error.status = res.status;

        throw error;
    }

    return res.json();
};

// 统一对 post 方法进行封装
export const post = async (url: string, data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = new Error(
            "An error occurred while fetching the data."
        ) as ApplicationError;

        error.message = await res.json();
        error.status = res.status;

        throw error;
    }

    return res.json();
};

export function getLocalStorage(key: string) {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem(key) || "[]");
    }
    return [];
}

export function validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export function generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
}

export function formatDate(input: Date | string | number): string {
    const date = new Date(input);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function countWords(text: string) {
    // 去掉首尾空格，并将文本按空白字符拆分为数组
    const words = text.trim().split(/\s+/);
    if (words.length === 1 && !words[0]) {
        return 0;
    }
    // 计算单词数量
    const wordCount = words.length;
    return wordCount;
}

export function getPathnameByURL(url: string) {
    try {
        const paths = url.split("/");
        return paths.pop();
    } catch (error) {
        return "unknow";
    }
}

export function formatBytes(bytes: number, decimals?: number) {
    if (bytes == 0) return "0 Bytes";
    const k = 1024,
        dm = decimals || 2,
        sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function getIsYearly(subscription: Order) {
    const isDev = process.env.NEXT_PUBLIC_NODE_ENV === "development";
    let isYearly = null;
    if (isDev) {
        pricingData.map((offer) => {
            if (offer.variantId_dev.monthly === subscription.variantId) {
                isYearly = false;
            } else if (offer.variantId_dev.yearly === subscription.variantId) {
                isYearly = true;
            }
        });
    } else {
        pricingData.map((offer) => {
            if (offer.variantId.monthly === subscription.variantId) {
                isYearly = false;
            } else if (offer.variantId.yearly === subscription.variantId) {
                isYearly = true;
            }
        });
    }

    return isYearly;
}

export function convertNumber(num: number) {
    const base = Math.floor(num / 10) * 10;
    return `${base}+`;
}

export function convertToAscii(inputString: string) {
    // remove non ascii characters
    const asciiString = inputString.replace(/[^\x00-\x7F]+/g, "");
    return asciiString;
}

export function getPayloadByVideo(searchParams: URLSearchParams) {
    return {
        prompt: searchParams.get("prompt"),
        modelId: searchParams.get("modelId"),
        aspectRatio: searchParams.get("aspectRatio"),
        duration: searchParams.get("duration"),
        mode: searchParams.get("mode"), // generationMode
        quailty: searchParams.get("quailty"),
        styleId: searchParams.get("styleId"),
        imageSrc: searchParams.get("imageSrc"),
    };
}

export function getCreditsByVideo(
    model: Model,
    { duration, speed, resolution }: any
) {
    switch (model.id) {
        case "wan":
            console.info(
                "getCost:",
                `${speed}_${duration}_${resolution}`,
                model.credits[`${speed}_${duration}_${resolution}`]
            );
            return model.credits[`${speed}_${duration}_${resolution}`];
        case "kling":
            return model.credits[duration];
        case "hailuo":
            return model.credits[duration];
        case "pixVerse":
            console.info(
                "getCost:",
                `${speed}_${duration}_${resolution}`,
                model.credits[`${speed}_${duration}_${resolution}`]
            );
            return model.credits[`${speed}_${duration}_${resolution}`];

        default:
            return model.credits[duration];
    }
}

export function onDownload(key: string, onFinished: any) {
    fetch(key)
        // fetch("/api/download", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       objectKey: key,
        //     }),
        //   })
        .then((res) => res.blob())
        .then((blob) => {
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style.display = "none";
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = url.split("/").slice(-1)[0];
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            setTimeout(() => {
                onFinished();
            }, 100);
        })
        .catch((err) => onFinished());
}
