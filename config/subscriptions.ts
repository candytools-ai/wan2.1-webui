export const pricingData: any[] = [
    {
        title: "Basic",
        // description: "Unlock Advanced Features",
        description: {
            monthly: "",
            yearly: "US$99/year",
        },
        benefits: [
            "600 standard credits/month",
            "300 advanced credits/month",
            "Access to advanced models monthly such as OpenAI o1, GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, xAI …",
            "Chat with uploaded Images",
            "Chat with uploaded documents",
            "Advanced Feature Access ChatPDF",
            "Access 80+ GPTs",
            "30-day chat history",
        ],
        limitations: [],
        prices: {
            monthly: 9.99,
            yearly: 99.99,
        },
        credits: {
            monthly: 600,
            yearly: 7200
        },
        advanced: {
            monthly: 300,
            yearly: 3600
        },
        variantId: {
            monthly: 634231,
            yearly: 634234
        },
        variantId_dev: {
            monthly: 626858,
            yearly: 626865
        },
        stripeIds: {
            monthly: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
            yearly: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
        },
    },
    {
        title: "Pro",
        // description: "For Power Users",
        description: {
            monthly: "",
            yearly: "US$199/year",
        },
        benefits: [
            "1200 standard credits/month",
            "600 advanced credits/month",
            "Access to advanced models monthly such as OpenAI o1, GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, xAI …",
            "Chat with uploaded Images",
            "Chat with uploaded documents",
            "Advanced Feature Access ChatPDF",
            "Access 80+ GPTs",
            "60-day chat history",
        ],
        limitations: [],
        prices: {
            monthly: 19.99,
            yearly: 199.99,
        },
        credits: {
            monthly: 1200,
            yearly: 14400
        },
        advanced: {
            monthly: 600,
            yearly: 7200
        },
        variantId: {
            monthly: 634232,
            yearly: 634235
        },
        variantId_dev: {
            monthly: 626859,
            yearly: 626870
        },
        stripeIds: {
            monthly: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
            yearly: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
        },
    },
    {
        title: "Premium",
        // description: "Unlock Advanced Features",
        description: {
            monthly: "",
            yearly: "US$299/year",
        },
        benefits: [
            "2000 standard credits/month",
            "1000 advanced credits/month",
            "Access to advanced models monthly such as OpenAI o1, GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, xAI …",
            "Chat with uploaded Images",
            "Chat with uploaded documents",
            "Advanced Feature Access ChatPDF",
            "Access 80+ GPTs",
            "90-day chat history",
        ],
        limitations: [],
        prices: {
            monthly: 29.99,
            yearly: 299.99,
        },
        credits: {
            monthly: 2000,
            yearly: 24000
        },
        advanced: {
            monthly: 1000,
            yearly: 12000
        },
        variantId: {
            monthly: 634233,
            yearly: 634236
        },
        variantId_dev: {
            monthly: 626861,
            yearly: 626871
        },
        stripeIds: {
            monthly: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
            yearly: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
        },
    },
];

export const freeData = {
    title: "Free",
    description: {
        monthly: "",
        yearly: "",
    },
    benefits: [
        "10 standard credits/month",
        "Access to chooat AI chat",
        "Access to GPT-4o-mini",
        "Access ChatPDF with 1 file upload",
        "Access 80+ GPTs",
    ],
    limitations: [
        "Access to advanced models monthly such as OpenAI o1, GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, xAI …",
        "Chat with uploaded Images",
        "Chat with uploaded documents",
        "chat history",
    ],
    prices: {
        monthly: 0,
        yearly: 0,
    },
    stripeIds: {
        monthly: null,
        yearly: null,
    },
};

export const plansColumns = [
    "free",
    "basic",
    "pro",
    "premium",
] as const;

export const comparePlans: any[] = [
    {
        feature: "Access to Basic Models",
        free: true,
        basic: true,
        pro: true,
        premium: true,
        tooltip: "Basic models include GPT-4o mini, Claude 3.5 Haiku, etc.",
    },
    {
        feature: "Access to Advanced Models",
        free: null,
        basic: true,
        pro: true,
        premium: true,
        tooltip: "Access to All Models",
    },
    {
        feature: "Plan",
        free: null,
        basic: "US$9.9/month",
        pro: "US$19.9/month",
        premium: "US$29.9/month",
        // tooltip: "Custom branding is available from the Pro plan onwards.",
    },
    {
        feature: "Standard Credits",
        free: "10 credits",
        basic: `600 credits/month`,
        pro: "1200 credits/month",
        premium: "2000 credits/month",
        tooltip: "standard credits can be used such as OpenAI o1, GPT-4o, Claude, Gemini... to chat.",
    },
    {
        feature: "Advanced Credits",
        free: "0 credits",
        basic: `300 credits/month`,
        pro: "600 credits/month",
        premium: "1000 credits/month",
        tooltip: "advanced credits can be used such as ChatPDF.",
    },
    {
        feature: "Advanced Feature Access",
        free: null,
        basic: true,
        pro: true,
        premium: true,
        tooltip: "Chat with PDF, webpage, images.",
    },
    // Add more rows as needed
];
