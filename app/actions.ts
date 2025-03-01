"use sever";
import {
    saveOrder,
    updateOrderBySubscriptionId,
    updateUserById,
} from "@/db/api";
import { Order } from "@/db/schema";

/**
 * This action will create a subscription on database.
 */
export async function createSub(subscriptionData: Order) {
    // 创建订阅数据
    return await saveOrder(subscriptionData).catch((err: any) => {
        console.error("创建订阅数据失败:", err);
    });
}

/**
 * This action will update a subscription on database.
 */
export async function updateSub(subscriptionData: Order) {
    // 更新订阅数据
    return await updateOrderBySubscriptionId(subscriptionData).catch(
        (err: any) => {
            console.error("更新订阅数据失败:", err);
        }
    );
}

export async function updateUser(userData: {
    userId: string;
    credits: number;
    advanced: number;
    subscribed: boolean;
}) {
    return await updateUserById(userData.userId, {
        credits: userData.credits,
        advanced: userData.advanced,
        subscribed: userData.subscribed,
    }).catch((error) => {
        console.error("更新用户credits失败", error);
    });
}
