import { InferSelectModel, relations } from "drizzle-orm";
import {
    pgTable,
    pgSchema,
    varchar,
    timestamp,
    json,
    uuid,
    text,
    primaryKey,
    foreignKey,
    boolean,
    integer,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const mySchema = pgSchema("wan21");

export const user = mySchema.table("user", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: varchar("image", { length: 1024 }),
    password: varchar("password", { length: 256 }),
    credits: integer().notNull().default(10), // 标准积分
    advanced: integer().notNull().default(0), // 高级积分
    subscribed: boolean("subscribed").notNull().default(false),
    paid: boolean("paid").notNull().default(false),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp({ mode: "date", precision: 3 }).$onUpdate(
        () => new Date()
    ),
});

export const accounts = mySchema.table(
    "account",
    {
        userId: uuid("userId")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        type: varchar("type", { length: 256 })
            .$type<AdapterAccountType>()
            .notNull(),
        provider: varchar("provider").notNull(),
        providerAccountId: varchar("providerAccountId", {
            length: 256,
        }).notNull(),
        refresh_token: varchar("refresh_token"),
        access_token: varchar("access_token"),
        expires_at: integer("expires_at"),
        token_type: varchar("token_type"),
        scope: varchar("scope"),
        id_token: varchar("id_token"),
        session_state: varchar("session_state", { length: 1024 }),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);

export const sessions = mySchema.table("session", {
    sessionToken: varchar("sessionToken", { length: 256 }).primaryKey(),
    userId: uuid("userId")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = mySchema.table(
    "verificationToken",
    {
        identifier: varchar("identifier", { length: 256 }).notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    })
);

export const authenticators = mySchema.table(
    "authenticator",
    {
        credentialID: varchar("credentialID", { length: 256 })
            .notNull()
            .unique(),
        userId: uuid("userId")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        providerAccountId: varchar("providerAccountId", {
            length: 256,
        }).notNull(),
        credentialPublicKey: varchar("credentialPublicKey", {
            length: 256,
        }).notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: varchar("credentialDeviceType", {
            length: 256,
        }).notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: varchar("transports", { length: 256 }),
    },
    (authenticator) => ({
        compositePK: primaryKey({
            columns: [authenticator.userId, authenticator.credentialID],
        }),
    })
);

export type User = InferSelectModel<typeof user>;

export const contact = mySchema.table("contact", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }).notNull(),
    message: text("message"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Contact = InferSelectModel<typeof contact>;

export const order = mySchema.table("Order", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    userId: uuid("userId")
        .notNull()
        .references(() => user.id),
    userName: varchar("userName", { length: 256 }).notNull(),
    userEmail: varchar("userEmail", { length: 256 }).notNull(),
    subscriptionId: varchar("subscriptionId", { length: 256 }).notNull(),
    orderId: integer().notNull(),

    /**
     * Subscription Status
     *
     * on_trial - 订阅处于试用期
     * active - 订阅是激活的
     * pause - 暂停收款
     * past_due - 续订支付失败，正在尝试重试
     * unpaid - 尝试4次后未恢复付款
     * cancelled - 未来的付款取消，但订阅仍然有效，直到当期结束
     * expired - 订阅已经结束
     */
    subscriptionStatus: varchar("subscriptionStatus", {
        enum: [
            "on_trial",
            "active",
            "pause",
            "past_due",
            "unpaid",
            "cancelled",
            "expired",
        ],
    }).notNull(),
    statusFormatted: varchar("statusFormatted", { length: 256 }),
    isMonthly: boolean("isMonthly").notNull().default(false),
    renewsAt: timestamp("renewsAt").defaultNow(), // 订阅到期时间
    subscriptionItemId: integer(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    amount: varchar("amount", { length: 256 }),
    plan: varchar("plan"),
    variantId: integer(), // 变体ID

    /**
     * Order Status
     *
     * pending - 支付中
     * failed - 支付失败
     * paid - 已支付
     * refunded - 已退款
     * partial_refund - 部分退款
     * fraudulent - 欺诈
     */
    // orderStatus: varchar("orderStatus", {
    //     enum: [
    //         "pending",
    //         "failed",
    //         "paid",
    //         "refunded",
    //         "partial_refund",
    //         "fraudulent",
    //     ],
    // }), // 订单状态
    credits: varchar("credits"), // 充值积分
});

export type Order = InferSelectModel<typeof order>;

export const videoGen = mySchema.table("VideoGen", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    userId: uuid("userId")
        .notNull()
        .references(() => user.id),
    prompt: text("prompt"),
    modelId: varchar("model_id", { length: 256 }).notNull(),
    model_url: varchar("model_url", { length: 512 }).notNull(), // model api
    image_url: varchar("image_url", { length: 2048 }),
    aspect_ratio: varchar("aspect_ratio", { length: 10 }),
    duration: varchar("duration", { length: 10 }),
    resolution: varchar("resolution", { length: 10 }),
    style: varchar("style", { length: 256 }),
    speed: varchar("speed", { length: 256 }),
    isPublic: boolean("is_public").default(true),
    predictionId: varchar("prediction_id", { length: 255 }),
    text_to_video: boolean("text_to_video").default(true),
    image_to_video: boolean("image_to_video").default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    generated: varchar("generated", { length: 2048 }),
    /**
     * Generate Status
     *
     * pending - 进行中
     * ok - 完成
     */
    status: varchar("status", { length: 512 }).default("pending"),
});

export type VideoGen = InferSelectModel<typeof videoGen>;

export const vote = mySchema.table("Vote", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    videoGenId: uuid("videoGenId")
        .notNull()
        .references(() => videoGen.id),
    userId: uuid("userId")
        .notNull()
        .references(() => user.id),
    isUpvoted: boolean("isUpvoted").notNull(),
});

export type Vote = InferSelectModel<typeof vote>;

export const videoGenRelations = relations(videoGen, ({ many }) => ({
    vote: many(vote),
}));

export const voteRelations = relations(vote, ({ one }) => ({
    note: one(videoGen, {
        fields: [vote.videoGenId],
        references: [videoGen.id],
    }),
}));
