// "use client";

import { languages, siteConfig } from "@/config/site";
import { getTranslations } from "next-intl/server";
import HeroSection4 from "@/components/marketing/hero4";
import FeatureSection9 from "@/components/marketing/feature9";
import FeatureHeader from "@/components/marketing/feature-header";
import { CTASection5 } from "@/components/marketing/cta5";


export default async function IndexPage() {
    return (
        <main>
            <HeroSection4 showBtn={true} herf="/ai-video-generator" herf2="/image-to-video" />
            <FeatureHeader name="KeyFeatures" />
            <FeatureSection9
                name="Feature1"
                badge={siteConfig.name}
                carousel={[
                    { videoSrc: "/motion-1.mp4", imageSrc: "/motion-1.png" },
                    { videoSrc: "/motion-2.mp4", imageSrc: "/motion-2.png" },
                    { videoSrc: "/motion-3.mp4", imageSrc: "/motion-3.png" },
                    { videoSrc: "/motion-4.mp4", imageSrc: "/motion-4.png" },
                    { videoSrc: "/motion-5.mp4", imageSrc: "/motion-5.png" },
                ]}
            />
            <FeatureSection9
                name="Feature2"
                badge={siteConfig.name}
                carousel={[
                    {
                        videoSrc: "/physical-1.mp4",
                        imageSrc: "/physical-1.png",
                    },
                    {
                        videoSrc: "/physical-2.mp4",
                        imageSrc: "/physical-2.png",
                    },
                    {
                        videoSrc: "/physical-3.mp4",
                        imageSrc: "/physical-3.png",
                    },
                    {
                        videoSrc: "/physical-4.mp4",
                        imageSrc: "/physical-4.png",
                    },
                ]}
                reverse={true}
            />
            <FeatureSection9
                name="Feature3"
                badge={siteConfig.name}
                carousel={[
                    {
                        videoSrc: "/cinematic-1.mp4",
                        imageSrc: "/cinematic-1.png",
                    },
                    {
                        videoSrc: "/cinematic-3.mp4",
                        imageSrc: "/cinematic-3.png",
                    },
                ]}
            />
            <CTASection5 name="CTA" href="/ai-video-generator" />
        </main>
    );
}
