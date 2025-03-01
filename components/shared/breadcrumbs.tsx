import {
    Breadcrumb,
    // BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbProps {
    home: {
        title: string;
        href?: string;
    };
    breadcrumbs: Array<{
        title: string;
        href?: string;
    }>;
}

export function Breadcrumbs({ home, breadcrumbs }: BreadcrumbProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href={home.href || "/"}>{home.title || "Home"}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {breadcrumbs.length > 1 && (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={breadcrumbs[0].href}>
                                {breadcrumbs[0].title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </>
                )}
                <BreadcrumbItem>
                    <BreadcrumbPage>{breadcrumbs[breadcrumbs.length > 1 ? 1 : 0].title}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
