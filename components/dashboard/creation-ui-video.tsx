"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarInset,
    SidebarProvider,
    useSidebar,
} from "@/components/ui/sidebar";
import CreationHeader from "@/components/dashboard/creation-header";
import CreationMain from "@/components/dashboard/creation-main";
import { SessionNavBar } from "@/components/dashboard/session-navbar";
import { AppSidebarVideo } from "@/components/dashboard/app-sidebar-video";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Clapperboard, Image as ImageIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useCreation } from "@/hooks/use-creation-video";
import { getPayloadByVideo } from "@/lib/utils";

const sidebarNav = [
    {
        name: "AI Video Generator",
        icon: <Clapperboard className="h-4 w-4 shrink-0" />,
        href: "/create/video",
        additional: "NEW",
    },
];

export default function CreationUI({ children }: any) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const payload = getPayloadByVideo(searchParams);
    const creation = useCreation(pathname, payload);

    return (
        <>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "368px",
                    } as React.CSSProperties
                }
            >
                <Sidebar
                    collapsible="icon"
                    className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
                >
                    <SessionNavBar navs={sidebarNav} />

                    {/* This is the second sidebar */}
                    {/* We disable collapsible and let it fill remaining space */}
                    <Sidebar
                        collapsible="none"
                        className="flex-1 md:flex bg-card pl-12"
                    >
                        <SidebarHeader className="p-4">
                            <Breadcrumbs
                                home={{
                                    title: siteConfig.name,
                                    href: siteConfig.url,
                                }}
                                breadcrumbs={[
                                    {
                                        title: "Video Generation",
                                        href: pathname,
                                    },
                                ]}
                            />
                        </SidebarHeader>
                        <SidebarContent className="gap-0">
                            <AppSidebarVideo
                                use="Dashboard"
                                creation={creation}
                            />
                        </SidebarContent>
                    </Sidebar>
                </Sidebar>
                <SidebarInset>
                    <CreationHeader use="Dashboard" creation={creation} />
                    <CreationMain use="Dashboard" creation={creation} />
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
