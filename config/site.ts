export const siteConfig: any = {
  name: "Wan AI",
  url: process.env.NEXT_PUBLIC_URL,
  domain: process.env.NEXT_PUBLIC_DOMAIN,
  email: `support@${process.env.NEXT_PUBLIC_DOMAIN}`
};

import { Pathnames, LocalePrefix } from "next-intl/routing";

export const defaultLocale = "en" as const;
export const languages = [
  { lang: "en", label: "English", hrefLang: "en-US" },
  { lang: "cn", label: "简体中文", hrefLang: "zh-CN" },
] as const;

export const locales = languages.map((lang) => lang.lang);

export const localePrefix: any = "as-needed";//"always";
export const localeDetection: boolean = false; // 不进行语言自动检测和自动跳转

// export const R2_DOMAIN = "cdn.chooat.com";