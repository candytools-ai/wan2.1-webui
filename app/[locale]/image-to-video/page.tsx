// "use client";

import { languages, siteConfig } from "@/config/site";
import { getTranslations } from "next-intl/server";
import HeroSection2 from "@/components/marketing/hero2";
import { ImageToVideoForm } from "@/components/section/image-to-video-form";
import { CTASection5 } from "@/components/marketing/cta5";
import HowToUse4 from "@/components/marketing/how-to-use4";
import FeatureSection11 from "@/components/marketing/feature11";


export default async function ImageToVideoPage() {
    return (
        <main className="relative">
            <div className="relative z-10">
                <HeroSection2 use="ImageToVideo" />
                <ImageToVideoForm use="ImageToVideo" name="Form" />
                <FeatureSection11
                    use="ImageToVideo"
                    name="KeyFeatures"
                    icons={[
                        "Film",
                        "Activity",
                        "Clapperboard",
                        "Pencil",
                        "Type",
                        "Music",
                    ]}
                />
                <HowToUse4 use="ImageToVideo" name="UserGuide" />
                <CTASection5 use="ImageToVideo" name="CTA" href="#form" />
            </div>
        </main>
    );
}
