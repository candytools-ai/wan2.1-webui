/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export const mdxComponents = {
    Image: (props: any) => <img {...props} className="rounded-3xl my-6" />,
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
            target="_blank"
            // rel="noopener noreferrer nofollow"
            {...props}
            className="text-primary font-semibold decoration-1 hover:decoration-2 underline underline-offset-2"
        />
    ),
    h1: (props: any) => (
        <h1
            // className="my-6 tracking-tight"
            {...props}
        />
    ),
    h2: (props: any) => (
        <h2
            // className="my-6 tracking-tight"
            {...props}
        />
    ),
    h3: (props: any) => (
        <h3
            // className="my-6 tracking-tight"
            {...props}
        />
    ),
    p: (props: any) => (
        <p
            // className="my-6 tracking-tight"
            {...props}
        />
    ),
    ul: (props: any) => (
        <ul
            // className="my-6 list-disc list-inside mt-6"
            {...props}
        />
    ),
    ol: (props: any) => (
        <ol
            // className="my-6 list-decimal list-inside mt-6"
            {...props}
        />
    ),
    blockquote: (props: any) => (
        <blockquote
            // className=" pl-4 italic my-6"
            {...props}
        />
    ),
    code: (props: any) => <code {...props} />,
    pre: (props: any) => (
        <pre
            // className="my-6 tracking-tight rounded-3xl p-6 overflow-x-auto"
            {...props}
        />
    ),
};
