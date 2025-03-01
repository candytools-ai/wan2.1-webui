import { updateVideoByPredictionId } from "@/db/api";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const req = await request.json();
    const { request_id, status, error, payload } = req;

    if (error) {
        console.error("/api/getResult error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "generate failed",
            },
            { status: 400 }
        );
    }

    const fileUrl = payload.video.url;

    // 更新用户记录
    const res = await updateVideoByPredictionId(request_id, {
        generated: fileUrl,
        status: "ok",
    }).catch((err) => {
        console.error("更新数据库失败", err);
    });

    return NextResponse.json({ data: res }, { status: 200 });
}
