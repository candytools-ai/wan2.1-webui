
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TabsParams {
    links: {
        href: string;
        label: string;
        selected: boolean;
    }[];
}

export function CreationTabs({ links }: TabsParams) {

    return (
        <>
            <div className="flex flex-col gap-y-1.5 pb-5 relative">
                <div className="grid items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground/70 grid-cols-2">
                    {links.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            data-state={item.selected ? "active" : "inactive"}
                            className={cn(
                                "flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                                `data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow cursor-pointer`
                            )}
                        >
                            <span className="">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
