import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: false,
    images: {
        unoptimized: true,
    },
    typescript: {
        // !! 警告 !!
        // 允许在生产构建过程中成功完成，即使项目存在类型错误。
        // !! 警告 !!
        ignoreBuildErrors: true,
    },
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    transpilePackages: ['next-mdx-remote'],
};

// if (process.env.NODE_ENV === "development") {
//     await setupDevPlatform();
// }

export default withNextIntl(nextConfig);
