import { File } from "buffer";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/app/(auth)/auth";
import { getUser } from "@/db/api";
import { uploadFile } from "@/lib/s3";
import { siteConfig } from "@/config/site";

const FileSchema = z.object({
    file: z
        .instanceof(File)
        .refine((file) => file.size <= 10 * 1024 * 1024, {
            message: "File size should be less than 10MB",
        })
        .refine(
            (file) =>
                ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
                    file.type
                ),
            {
                message: "File type should be JPEG, PNG, TXT",
            }
        ),
});

export async function POST(request: Request) {
    const session = await auth();

    if (!session) {
        // Response.json return to then
        return Response.json({ message: "Unauthorized" }, { status: 401 });
        // new Response return to catch
        // return new Response("Unauthorized", { status: 401 });
    }
    let [user] = await getUser(session.user?.email as string);

    // if (user.credits <= 0) {
    //     return Response.json({ message: "Not Credits" }, { status: 400 });
    // }

    if (request.body === null) {
        return new Response("Request body is empty", { status: 400 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file") as unknown as File;
        const file_path = formData.get("file_path") as string;

        if (!file) {
            return Response.json(
                { message: "No file uploaded" },
                { status: 400 }
            );
        }

        const validatedFile = FileSchema.safeParse({ file });

        if (!validatedFile.success) {
            const errorMessage = validatedFile.error.errors
                .map((error) => error.message)
                .join(", ");

            return Response.json({ message: errorMessage }, { status: 400 });
        }

        const filename = file.name;
        // const fileBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = filename.split(".")?.pop() || "";
        const objectKey = `${siteConfig.name.replace(/\s+/, "_")}/${process.env.NODE_ENV}${
            file_path || ""
        }/${nanoid(8)}.${ext}`;

        console.info("uploadFile-----", objectKey);

        try {
            const file = await uploadFile({
                FileName: filename,
                fileBuffer: buffer,
                objectKey,
            });

            const data = {
                url: file?.url,
                // @ts-ignore
                size: formData.get("file")?.size,
                objectKey,
                // url: url,
                pathname: `${nanoid(8)}.${ext}`,
                contentType: file?.contentType,
            };

            if (!file) {
                return NextResponse.json(
                    { message: "File upload failed" },
                    { status: 400 }
                );
            } else {
                return NextResponse.json(data);
            }
        } catch (error) {
            return NextResponse.json(
                { message: "Upload failed" },
                { status: 500 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to process request" },
            { status: 500 }
        );
    }
}
