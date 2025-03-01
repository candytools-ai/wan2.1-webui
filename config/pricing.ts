const store_url = "https://candytools.lemonsqueezy.com";

export const pricing: any = {
    free: {
        monthly: {
            displayPrice: "0",
            price: 0,
            credits: 10,
        },
        annually: {
            displayPrice: "0",
            price: 0,
            credits: 10,
        },
    },
    basic: {
        tag: true,
        monthly: {
          name: 'Monthly',
          displayPrice: "9.99",
          price: 9.99,
          credits: 100,
          // variantId: 574322, // <-- Lemon Squeezy variant ID for test
          variantId: 574351,
        },
        annually: {
          name: 'Yearly',
          displayPrice: "8.33",
          price: 99.99,
          credits: 1200,
          // variantId: 574325, // <-- Lemon Squeezy variant ID for test
          variantId: 574354,
        },
    },
    standard: {
        monthly: {
          name: 'Monthly',
          displayPrice: "29.99",
          price: 29.99,
          credits: 400,
          // variantId: 574323, // <-- Lemon Squeezy variant ID for test
          variantId: 574352,
        },
        annually: {
          name: 'Yearly',
          displayPrice: "24.99",
          price: 299.99,
          credits: 4000,
          // variantId: 574326, // <-- Lemon Squeezy variant ID for test
          variantId: 574355,
        },
    },
    pro: {
        monthly: {
          name: 'Monthly',
          displayPrice: "59.99",
          price: 59.99,
          credits: 800,
          // variantId: 574324, // <-- Lemon Squeezy variant ID for test
          variantId: 574353,
        },
        annually: {
          name: 'Yearly',
          displayPrice: "49.99",
          price: 599.99,
          credits: 8800,
          // variantId: 574327, // <-- Lemon Squeezy variant ID for test
          variantId: 574356,
        },
    },
};
