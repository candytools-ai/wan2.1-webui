import { User } from "@/db/schema";
import {
    lemonSqueezySetup,
    createCheckout,
    getSubscription,
    listSubscriptions,
    getSubscriptionItem,
    cancelSubscription
} from "@lemonsqueezy/lemonsqueezy.js";
import { revalidatePath } from "next/cache";

/**
 * Ensures that required environment variables are set and sets up the Lemon
 * Squeezy JS SDK. Throws an error if any environment variables are missing or
 * if there's an error setting up the SDK.
 */
export function configureLemonSqueezy() {
    if (
        !process.env.LEMON_SQUEEZY_API_KEY ||
        !process.env.LEMON_SQUEEZY_STORE_ID
    ) {
        throw new Error(
            `Missing required LEMONSQUEEZY env variables. Please, set them in your .env file.`
        );
    }

    lemonSqueezySetup({
        apiKey: process.env.LEMON_SQUEEZY_API_KEY,
        onError: (error) => {
            // eslint-disable-next-line no-console -- allow logging
            console.error(error);
            throw new Error(`Lemon Squeezy API error: ${error.message}`);
        },
    });
}

export async function getCheckoutURL(
    user: User,
    variantId: number,
    embed = false
): Promise<string | undefined> {
    configureLemonSqueezy();

    const checkout = await createCheckout(
        process.env.LEMON_SQUEEZY_STORE_ID!,
        variantId,
        {
            checkoutOptions: {
                embed,
                media: false,
                logo: !embed,
            },
            checkoutData: {
                email: user.email ?? undefined,
                custom: {
                    user_id: user.id,
                },
            },
            productOptions: {
                enabledVariants: [variantId],
                redirectUrl: `${process.env.NEXT_PUBLIC_URL}/`,
                // receiptButtonText: "Go to Generation",
                // receiptThankYouNote:
                //     "Thank you for signing up to Lemon Stand!",
            },
        }
    );

    return checkout.data?.data.attributes.url;
}

export async function getUserSubscription(subscriptionId: number) {
    configureLemonSqueezy();
    // const subscription = await getSubscription(subscriptionId, {
    //     include: ["order"],
    // });
    const subscription = await getSubscription(subscriptionId, { include: ["order"] });
    // const subscription = await getSubscriptionItem(subscriptionId, { include: ["subscription", "price"] });

    if (subscription.error) {
        throw new Error(subscription.error.message);
    }

    revalidatePath("/");

    return subscription;
}

// export async function getUserSubscriptions() {
//     configureLemonSqueezy();
//     const { statusCode, error, data } = await listSubscriptions();

//     return { statusCode, error, data };
// }

export async function cancelUserSubscription(subscriptionId: number) {
    configureLemonSqueezy();
    const subscription = await cancelSubscription(subscriptionId);

    if (subscription.error) {
        throw new Error(subscription.error.message);
    }

    return subscription;
}