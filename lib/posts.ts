import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
    slug: string;
    title: string;
    description: string;
    date: string;
}

export async function getAllPosts(): Promise<Post[]> {
    const files = fs.readdirSync(path.join(process.cwd(), "blog"));

    const posts = files
        .filter((filename) => filename.endsWith(".md"))
        .map((filename) => {
            const content = fs.readFileSync(
                path.join(process.cwd(), "blog", filename),
                "utf8"
            );

            // 解析 frontmatter
            const match = content.match(/---\n([\s\S]*?)\n---/);
            const frontmatter = match?.[1];
            const metadata: Record<string, string> = {};

            frontmatter?.split("\n").forEach((line) => {
                const [key, ...value] = line.split(":");
                if (key && value) {
                    metadata[key.trim()] = value
                        .join(":")
                        .trim()
                        .replace(/^['"]|['"]$/g, "");
                }
            });

            return {
                slug: filename.replace(".md", ""),
                title: metadata.title || "",
                description: metadata.description || "",
                date: metadata.date || "",
            };
        })
        .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

    return posts;
}

export async function getPostBySlug(slug: string) {
    const fullPath = path.join(process.cwd(), "blog", `${slug}.md`);
    const content = fs.readFileSync(fullPath, "utf8");

    // 移除 frontmatter
    const contentWithoutFrontmatter = content.replace(
        /---\n[\s\S]*?\n---\n/,
        ""
    );
    // 使用 gray-matter 解析 frontmatter
    const { data } = matter(content);

    return {
        title: data.title || "", // 如果不存在则返回空字符串
        description: data.description || "", // 如果不存在则返回空字符串
        content: contentWithoutFrontmatter,
    };
}
