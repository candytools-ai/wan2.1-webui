import { auth } from "@/app/(auth)/auth";
import to from "await-to-js";
import { NextResponse } from "next/server";
import { DEFAULT_MODEL, models } from "@/config/models-video";
import { getCreditsByVideo } from "@/lib/utils";
import { updateUserById, createVideo } from "@/db/api";

interface CreateGenerationParams {
    request_id: string;
    prompt: string;
    modelId: string;
    image_url: string;
    model: string; // model api
    aspect_ratio: string;
    duration: string;
    resolution: string;
    style: string;
    speed: string;
    isPublic: boolean;
    image_to_video: boolean;
}

export async function POST(request: Request) {
    const {
        request_id,
        prompt,
        modelId,
        image_url,
        model, // model api
        aspect_ratio,
        duration,
        resolution,
        style,
        speed,
        isPublic,
        image_to_video,
    }: CreateGenerationParams = await request.json();

    const session: any = await auth();
    const user = session?.user;
    const currentModel =
        models.find((model) => model.id === modelId) || DEFAULT_MODEL;
    const cost = getCreditsByVideo(currentModel, { duration, speed, resolution });

    // 未登录用户
    if (!user || !user.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    // 非订阅用户使用需订阅付费模型
    if (!user.subscribed && currentModel.upgrade) {
        return new Response(
            "Non-subscriber, Please upgrade your payment plan!",
            { status: 401 }
        );
    }

    // 积分不足
    if (user.credits === 0 || user.credits < currentModel.credits) {
        return new Response(
            "No enough Credits, Please upgrade your payment plan!",
            { status: 401 }
        );
    }

    console.info(user.credits, cost)

    try {
        // 创建成功之后，扣除积分
        const newCredits = user.credits - cost;
        await updateUserById(user.id, {
            credits: newCredits,
        }).catch((error) => {
        });
    } catch (error) {
        return {};
    }

    // 优先存入一份记录
    const insertData: any = {
        prompt: prompt.trim(),
        modelId,
        model_url: model, // model api
        image_url,
        aspect_ratio,
        duration,
        resolution,
        style,
        speed,
        isPublic,
        status: "pending",
        predictionId: request_id,
        userId: user.id,
        text_to_video: !image_to_video,
        image_to_video,
    };
    // 生成用户记录
    const [insertErr, insertRes]: any = await to(createVideo(insertData));

    if (insertErr) {
        console.error("提交数据库失败", insertErr);
        return NextResponse.json(
            { message: "create video error" },
            { status: 401 }
        );
    }

    console.info("insertRes:", insertRes)

    return NextResponse.json(
        {
            request_id: insertRes.predictionId,
            created_at: insertRes.createdAt,
            status: insertRes.status,
        },
        { status: 200 }
    );
}
