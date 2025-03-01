import { siteConfig } from "@/config/site";

const Navs: any[] = [
    {
        label: "Resource",
        items: [
            { title: "Home", href: "/" },
            { title: "AI Video Generator", href: `/ai-video-generator` },
            { title: "Image To Video", href: `/image-to-video` },
        ],
    },
    {
        label: "Legal",
        items: [
            {
                href: "/privacy-policy",
                title: "Privacy Policy",
            },
            {
                href: "/terms-of-service",
                title: "Terms & Conditions",
            },
        ],
    },
];

export default Navs;
