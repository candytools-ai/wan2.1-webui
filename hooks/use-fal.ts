"use client";

import { fal } from "@fal-ai/client";
import to from "await-to-js";
import { useState } from "react";
import { toast } from "sonner";

export interface IGeneration {
    loading: boolean; // isGenerating
    status: "" | "IN_QUEUE" | "IN_PROGRESS" | "COMPLETED" | "error";
    generated: any;
    errorMsg: string;
}

export interface PredictionParams {
    [key: string]: any;
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function usePrediction(user: any) {
    const [generation, setGeneration] = useState<IGeneration>({
        status: "",
        loading: false,
        generated: null,
        errorMsg: "",
    });
    const [error, setError] = useState<any>(null);

    const handleSubmit = async (params: any) => {
        fal.config({
            // credentials: process.env.FAL_KEY,
            proxyUrl: "/api/fal/proxy",
        });

        setGeneration({
            ...generation,
            status: "IN_QUEUE",
            loading: true,
            generated: null,
            errorMsg: "",
        });

        const input = (function () {
            const { prompt, duration, aspect_ratio, image_url, resolution } =
                params;
            if (!params.image_to_video)
                return {
                    prompt,
                    duration,
                    aspect_ratio,
                    resolution,
                };
            else
                return {
                    prompt: params.prompt,
                    image_url,
                    duration,
                    aspect_ratio,
                    resolution,
                };
        })();

        const [error, createFalRes]: any = await to(
            fal.queue.submit(params.model, {
                input,
                webhookUrl: `${process.env.NEXT_PUBLIC_FAL_WEBHOOK_HOST}/api/getResult`,
            })
        );
        console.info("createFalRes:", createFalRes);

        if (error) {
            const errorMsg =
                error?.body?.detail || error.message || "Unknown error";
            console.error("createFalRes error:", error);
            toast.error(errorMsg);
            setGeneration({
                ...generation,
                status: "error",
                loading: false,
                generated: null,
                errorMsg,
            });

            return;
        }

        // create record in db
        const [createGenErr, createGenRes]: any = await to(
            fetch("/api/createVideo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user,
                    request_id: createFalRes.request_id,
                    ...params,
                }),
            })
        );

        if (createGenErr) {
            console.error("fetch /api/createVideo error", createGenErr.message);
            toast.error("create record error");
            setGeneration({
                ...generation,
                status: "error",
                loading: false,
                generated: null,
                errorMsg: createGenErr.message,
            });
            return;
        }

        const prediction = await createGenRes.json();

        if (createGenRes.status !== 200) {
            console.error(
                "fetch /api/createVideo error",
                createGenRes.status,
                prediction.message
            );
            toast.error(prediction.message);
            setGeneration({
                ...generation,
                status: "error",
                loading: false,
                generated: null,
                errorMsg: prediction.message,
            });
            return;
        }

        let status: any;
        while (status !== "COMPLETED" && status !== "error") {
            await sleep(5000);
            status = await getStatus(createFalRes.request_id, params);
            setGeneration({
                ...generation,
                status,
                loading: true,
                generated: null,
                errorMsg: "",
            });
        }

        if (status === "error") {
            // setGeneration({
            //     ...generation,
            //     status,
            //     loading: false,
            //     generated: null,
            //     errorMsg: "",
            // });
            return;
        }

        const res = await getResult(createFalRes.request_id, params);
        console.info("data:", res.data);
        setGeneration({
            ...generation,
            status,
            loading: false,
            generated: { url: res.data.video.url, predictionId: res.requestId },
            errorMsg: "",
        });

        console.info("createGen:", params);
    };

    const getStatus = async (requestId: string, params: any) => {
        const [err, result]: any = await to(
            fal.queue.status(params.model, {
                requestId,
                logs: true,
            })
        );
        if (err) {
            const errorMsg =
                err?.body?.detail || err.message || "Unknown error";
            toast.error(errorMsg);
            setGeneration({
                ...generation,
                status: result.status,
                loading: false,
                generated: null,
                errorMsg,
            });
            return "error";
        }
        console.info("client getStatus:", result);

        return result.status;
    };

    const getResult = async (requestId: string, params: any) => {
        const [err, result]: any = await to(
            fal.queue.result(params.model, {
                requestId,
            })
        );
        if (err) {
            const errorMsg =
                error?.body?.detail || error.message || "Unknown error";
            toast.error(errorMsg);
            setGeneration({
                ...generation,
                status: "COMPLETED",
                loading: false,
                generated: null,
                errorMsg,
            });
            return false;
        }
        console.info("getResult:", result);

        return result;
    };

    return {
        // prediction,
        error,
        generation,
        handleSubmit,
    };
}
