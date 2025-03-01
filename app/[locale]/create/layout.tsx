import { ReactNode } from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type Props = {
    children: ReactNode;
    params: any;
};


export default function CreationLayout({ children, params }: Props) {
    return <>{children}</>;
}
