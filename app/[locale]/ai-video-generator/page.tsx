// "use client";

import { languages, siteConfig } from "@/config/site";
import { getTranslations } from "next-intl/server";
import HeroSection2 from "@/components/marketing/hero2";
import { TextToVideoForm } from "@/components/section/text-to-video-form";
import FeatureSection11 from "@/components/marketing/feature11";
import HowToUse4 from "@/components/marketing/how-to-use4";
import { CTASection5 } from "@/components/marketing/cta5";


export default async function TextToVideoPage() {
    return (
        <main className="relative">
            <div className="relative z-10">
                <HeroSection2 use="TextToVideo" />
                <TextToVideoForm use="TextToVideo" name="Form" />
                <FeatureSection11
                    use="TextToVideo"
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
                <HowToUse4 use="TextToVideo" name="UserGuide" />
                <CTASection5 use="TextToVideo" name="CTA" href="#form" />
            </div>
        </main>
    );
}
