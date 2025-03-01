"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ButtonCopy } from "@/components/ui/button-copy";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Embed({ content }: { content: string }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="group absolute right-0 top-0 z-[1] inline-flex cursor-pointer items-center gap-1 rounded-bl-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-2 py-1.5 text-sm font-medium text-gray-100 transition duration-500 hover:from-blue-600 hover:to-violet-600 hover:text-white">
                    Get Embed Code
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="flex justify-between">
                    <div className="flex items-center justify-between">
                    <AlertDialogTitle>Embed</AlertDialogTitle>
                    <AlertDialogFooter>
                    <AlertDialogCancel asChild><Button size="icon" variant="ghost" className="h-7 text-muted-foreground">x</Button></AlertDialogCancel>
                    </AlertDialogFooter>
                    </div>
                </AlertDialogHeader>
                <Textarea rows={3} readOnly value={content} />
                <div className="flex justify-end">
                    <ButtonCopy
                        size={"sm"}
                        // className="text-xs bg-[#2f2f2f]"
                        content={content}
                    >
                        Copy
                    </ButtonCopy>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
