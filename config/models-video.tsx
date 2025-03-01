// Define your models here.

import { Tablet, Zap } from "lucide-react";
import React from "react";

export interface Model {
    id: string; // 模型id
    label: string; // 模型显示名称
    image: {
        light: string;
        dark: string;
    }; // 模型图片url
    api: {
        [key: string]: {
            [key: string]: string;
        };
    }; // 模型参数值
    upgrade: boolean; // 是否需要订阅会员
    credits: {
        [key: string]: number;
    }; // 模型对话所需消耗积分
    times: Array<{
        value: string;
        upgrade: boolean;
        selected: boolean;
        disabled: boolean;
    }>;
    ratios: Array<{
        value: string;
        upgrade: boolean;
        selected: boolean;
        disabled: boolean;
    }>;
    resolutions: Array<{
        value: string;
        upgrade: boolean;
        selected: boolean;
        disabled: boolean;
    }>;
    styles: Array<{
        label: string;
        value: string;
        src: string;
        upgrade: boolean;
        selected: boolean;
        disabled: boolean;
    }>;
    speed: Array<{
        label: string;
        value: string;
        description: string;
        icon: React.ReactNode;
        upgrade: boolean;
        selected: boolean;
        disabled: boolean;
    }>;
    description: string;
    // i18n: string
}

const ZapIcon = (
    <Zap
        width={16}
        height={16}
        strokeWidth={3}
        className="text-primary-foreground"
    />
);
const TabletIcon = (
    <Tablet
        width={16}
        height={16}
        strokeWidth={3}
        className="text-primary-foreground"
    />
);

export const models: Array<Model> = [
    {
        id: "wan",
        label: "Wan 2.1",
        image: {
            light: "/ai-wan-icon.png",
            dark: "/ai-wan-icon.png",
        },
        api: {
            text_to_video: {
                normal: "fal-ai/wan-t2v",
                fast: "fal-ai/wan/v2.1/1.3b/text-to-video",
            },
            image_to_video: {
                normal: "fal-ai/wan-i2v",
            },
        },
        upgrade: false,
        credits: {
            "fast_5_480p": 5,
            "fast_5_580p": 5,
            "fast_5_720p": 5,
            "normal_5_480p": 10,
            "normal_5_580p": 10,
            "normal_5_720p": 10,
        },
        times: [
            { value: "5", upgrade: false, selected: true, disabled: false },
        ],
        ratios: [
            { value: "16:9", upgrade: false, selected: true, disabled: false },
            { value: "9:16", upgrade: true, selected: false, disabled: false },
        ],
        resolutions: [
            { value: "480p", upgrade: false, selected: true, disabled: false },
            { value: "720p", upgrade: true, selected: false, disabled: false },
        ],
        styles: [],
        speed: [
            {
                label: "High quality",
                value: "normal",
                description: "High-quality mode require longer processing time (T2V-14B, I2V-14B)",
                icon: TabletIcon,
                upgrade: true,
                selected: false,
                disabled: false,
            },
            {
                label: "Faster",
                value: "fast",
                description: "Fast AI video generation speed (T2V-1.3B)",
                icon: ZapIcon,
                upgrade: false,
                selected: true,
                disabled: false,
            },
        ],
        description:
            "Create 720p high-quality videos with high visual quality and motion diversity in 1-5 minutes.",
    },
] as const;

export const DEFAULT_MODEL = models[0];
export const DEFAULT_MODEL_NAME: string = models[0].id;
