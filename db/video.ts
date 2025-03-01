"server-only";

import { db } from "@/db/api";
import { user, User, videoGen, VideoGen, vote } from "./schema";
import {
    and,
    count,
    desc,
    eq,
    inArray,
    isNotNull,
    isNull,
    sql,
} from "drizzle-orm";

export async function createVideo(data: any) {
    try {
        const [record] = await db.insert(videoGen).values(data).returning({
            request_id: videoGen.predictionId,
            created_at: videoGen.createdAt,
            status: videoGen.status,
        });
        return record;
    } catch (error) {
        console.error("Failed to create videoGen in database");
        throw error;
    }
}

export async function updateVideoByPredictionId(
    predictionId: string,
    params: any
) {
    try {
        return await db
            .update(videoGen)
            .set({ ...params })
            .where(eq(videoGen.predictionId, predictionId));
    } catch (error) {
        console.error("Failed to update videoGen in database", error);
        throw error;
    }
}

export async function getVideoById({ id }: { id: string }) {
    try {
        return await db.select().from(videoGen).where(eq(videoGen.id, id));
    } catch (error) {
        console.error("Failed to get videoGen by id from database", error);
        throw error;
    }
}

export async function voteVideo({
    userId,
    videoGenId,
    type,
}: {
    userId: string;
    videoGenId: string;
    type: "up" | "down";
}) {
    try {
        const [existingVote] = await db
            .select()
            .from(vote)
            .where(and(eq(vote.videoGenId, videoGenId)));

        if (existingVote) {
            return await db
                .update(vote)
                .set({ isUpvoted: type === "up" ? true : false })
                .where(eq(vote.videoGenId, videoGenId));
        } else {
            return await db.insert(vote).values({
                userId,
                videoGenId,
                isUpvoted: type === "up" ? true : false,
            });
        }
    } catch (error) {
        console.error("Failed to upvote videoGen in database", error);
        throw error;
    }
}

export async function getVotesByVideoGenId({
    videoGenId,
}: {
    videoGenId: string;
}) {
    try {
        return await db
            .select()
            .from(vote)
            .where(eq(vote.videoGenId, videoGenId));
    } catch (error) {
        console.error(
            "Failed to get votes by videoGen id from database",
            error
        );
        throw error;
    }
}

export async function getVideosWithVote({
    page,
    pageSize,
    isPublic,
    userId,
}: {
    page: number;
    pageSize: number;
    isPublic?: boolean;
    userId?: string;
}) {
    const pageNumber = page - 1 < 0 ? 0 : page - 1;
    const offset = pageNumber * pageSize || 0;
    const where = isPublic
        ? and(isNotNull(videoGen.generated), eq(videoGen.isPublic, true))
        : isNotNull(videoGen.generated);
    try {
        return await db.query.videoGen.findMany({
            limit: pageSize,
            offset,
            orderBy: [desc(videoGen.createdAt)],
            where: where,
            columns: {
                id: true,
                modelId: true,
                aspect_ratio: true,
                generated: true,
                createdAt: true,
            },
            with: {
                // vote: true
                vote: {
                    // relation: videoGen.id,
                    // alias: "votes_count",
                    columns: {
                        id: true,
                        // isUpvoted: true,
                        isUpvoted: !!userId,
                        // isSelect: !!userId
                        // count: sql<number>`count(${vote.id})`,
                    },
                    where: and(eq(vote.isUpvoted, true)),
                    // where: (videoGen: VideoGen) =>
                    //     and(eq(vote.videoGenId, videoGen.id)),
                },
            },
        });
    } catch (error) {
        console.error("Failed to get videos with vote from database");
        throw error;
    }
}

export async function getVideos({
    page,
    pageSize,
    isPublic,
}: {
    page: number;
    pageSize: number;
    isPublic?: boolean;
}) {
    const pageNumber = page - 1 < 0 ? 0 : page - 1;
    const offset = pageNumber * pageSize;
    const where = isPublic
        ? and(isNotNull(videoGen.generated), eq(videoGen.isPublic, true))
        : isNotNull(videoGen.generated);
    try {
        return await db
            .select()
            .from(videoGen)
            .where(where)
            .orderBy(desc(videoGen.createdAt))
            .limit(pageSize || 20) // the number of rows to return
            .offset(offset || 0); // the number of rows to skip
    } catch (error) {
        console.error("Failed to get video list from database");
        throw error;
    }
}

export async function getVideosCount({ isPublic }: { isPublic?: boolean }) {
    try {
        const where = isPublic
            ? and(isNotNull(videoGen.generated), eq(videoGen.isPublic, true))
            : isNotNull(videoGen.generated);
        const [videos] = await db
            .select({ count: count() })
            .from(videoGen)
            .where(where);

        return videos.count;
    } catch (error) {
        console.error("Failed to get videos count from database");
        throw error;
    }
}
