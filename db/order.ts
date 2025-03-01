"server-only";

import { genSaltSync, hashSync } from "bcrypt-ts";
import { db } from "@/db/api"
import { user, User, Order, order, contact, Contact } from "./schema";
import { eq } from "drizzle-orm";

export async function getOrderBySubscriptionId({
    subscriptionId,
}: {
    subscriptionId: number;
}) {
    try {
        return await db
            .select()
            .from(order)
            .where(eq(order.subscriptionId, String(subscriptionId)));
    } catch (error) {
        console.error(
            "Failed to get order by subscription id from database",
            error
        );
        throw error;
    }
}

export async function getOrderBySubscriptionItemId({
    subscriptionItemId,
}: {
    subscriptionItemId: number;
}) {
    try {
        return await db
            .select()
            .from(order)
            .where(eq(order.subscriptionItemId, subscriptionItemId));
    } catch (error) {
        console.error(
            "Failed to get order by subscription item id from database",
            error
        );
        throw error;
    }
}

/**
 * 更新订单
 * @param id 订单id
 * @param subscription 订阅数据
 * @returns 订单表数据
 */
export async function updateOrder(id: string, subscription: Order) {
    try {
        return await db
            .update(order)
            .set({ ...subscription })
            .where(eq(order.id, id));
    } catch (error) {
        console.error("Failed to update order in database", error);
        throw error;
    }
}

export async function updateOrderBySubscriptionId(subscription: Order) {
    try {
        return await db
            .update(order)
            .set({ ...subscription })
            .where(eq(order.subscriptionId, subscription.subscriptionId));
    } catch (error) {
        console.error(
            "Failed to update order by subscriptionId in database",
            error
        );
        throw error;
    }
}

export async function saveOrder(subscription: Order) {
    try {
        return await db.insert(order).values(subscription);
    } catch (error) {
        console.error("Failed to save subscription in database", error);
        throw error;
    }
}

export async function getUserSubscriptionPlan(userId: string) {
    try {
        return await db.select().from(order).where(eq(order.userId, userId));
    } catch (error) {
        console.error("Failed to get order by user id from database", error);
        throw error;
    }
}