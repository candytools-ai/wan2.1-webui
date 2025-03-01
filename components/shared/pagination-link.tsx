import { cn } from "@/lib/utils";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import { ReactNode } from "react";
import Pagination from "rc-pagination";

const PaginationLink = ({
    urlPrefix,
    page,
    pageSize,
    total,
    searchStr,
}: any) => {
    page = Number(page);

    function getPrev() {
        if (page == 1) {
            return "" + searchStr;
        } else if (page == 2) {
            return urlPrefix + searchStr;
        } else {
            return `${urlPrefix}/${page - 1}` + searchStr;
        }
    }

    function getNext() {
        if (page === total) {
            return "" + searchStr;
        } else {
            return `${urlPrefix}/${page + 1}` + searchStr;
        }
    }

    const itemRender = (current: number, type: string, element: ReactNode) => {
        const activeClass =
            "bg-primary text-gray-800 focus:bg-gray-300 dark:text-white dark:focus:bg-neutral-500";
        const defaultClass =
            "text-gray-800 hover:bg-gray-100 focus:bg-gray-100 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10";

        if (type === "page") {
            return (
                <a
                    className={current == page ? "pointer-events-none" : ""}
                    href={
                        current === page
                            ? ""
                            : `${
                                  page === 1
                                      ? `${urlPrefix}` + searchStr
                                      : `${urlPrefix}/${page}` + searchStr
                              }`
                    }
                >
                    <button
                        className={cn(
                            "min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm rounded-lg focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
                            current === page ? activeClass : defaultClass
                        )}
                        aria-current={page ? "page" : undefined}
                    >
                        {current}
                    </button>
                </a>
            );
        } else if (type === "prev") {
            return (
                <a
                    href={getPrev()}
                    className={page == 1 ? "pointer-events-none" : ""}
                >
                    <button
                        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                        aria-label="Previous"
                    >
                        <ChevronLeft className="size-3.5" />
                        <span className="sr-only">Previous</span>
                    </button>
                </a>
            );
        } else if (type === "next") {
            return (
                <a
                    href={getNext()}
                    className={page == total ? "pointer-events-none" : ""}
                >
                    <button
                        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                        aria-label="Next"
                    >
                        <ChevronRight className="size-3.5" />
                        <span className="sr-only">Next</span>
                    </button>
                </a>
            );
        } else if (type === "jump-next" || type === "jump-prev") {
            return (
                <div className="hs-tooltip inline-block">
                    <a
                        href={
                            type === "jump-next"
                                ? `${urlPrefix}/${page + 5}` + searchStr
                                : `${urlPrefix}/${page - 5}` + searchStr
                        }
                        className={page == 1 ? "pointer-events-none" : ""}
                    >
                        <button
                            type="button"
                            className="hs-tooltip-toggle group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text- p-2 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-500 dark:focus:bg-white/10"
                        >
                            <span className="group-hover:hidden text-xs">
                                •••
                            </span>
                            {type === "jump-prev" ? (
                                <ChevronsLeft className="group-hover:block hidden shrink-0 size-5" />
                            ) : (
                                <ChevronsRight className="group-hover:block hidden shrink-0 size-5" />
                            )}
                            <span
                                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                                role="tooltip"
                            >
                                {type === "jump-next"
                                    ? "Next 5 pages"
                                    : "Prev 5 pages"}
                            </span>
                        </button>
                    </a>
                </div>
            );
        }
        return element;
    };

    return (
        <>
            <Pagination
                total={total}
                current={page}
                pageSize={pageSize}
                itemRender={itemRender}
                className="flex items-center justify-center mt-12 gap-x-1"
                onChange={() => {}}
            />
        </>
    );
};

export default PaginationLink;
