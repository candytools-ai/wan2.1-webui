import { Textarea } from "@/components/ui/textarea";
import { videoPrompts } from "@/config/prompts";
import { Badge } from "@/components/ui/badge";
import { FormHeader } from "@/components/dashboard/form-header";

interface FormParams {
    title: string;
    tips?: string;
    prompt: string
    handlePrompt: any
}

export function PromptsForm({ title, tips, prompt, handlePrompt }: FormParams) {

    return (
        <>
            <div className="flex flex-col gap-y-1.5 pb-5">
                <FormHeader title={title} tips={tips} />
                <Textarea
                    rows={4}
                    // placeholder={t(`${name}.placeholder`)}
                    placeholder={"describe video"}
                    className="p-3 text-sm rounded-xl"
                    value={prompt}
                    onInput={(e: any) => handlePrompt(e.target.value)}
                />
                <div className="flex flex-wrap items-center gap-2">
                    <div className="text-muted-foreground text-xs">Ideas:</div>{" "}
                    {videoPrompts.map((item) => (
                        <Badge
                            key={item.title}
                            className="py-0.5 px-2 text-xs font-normal cursor-pointer dark:bg-neutral-700"
                            variant="secondary"
                            onClick={() => handlePrompt(item.description)}
                        >
                            {item.title}
                        </Badge>
                    ))}
                </div>
            </div>
        </>
    );
}
