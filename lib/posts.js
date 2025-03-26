import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkToc from "remark-toc";
import remarkBreaks from "remark-breaks";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import rehypeStarryNight from "rehype-starry-night";
import rehypeSlug from "rehype-slug";
import rehypeReact from "rehype-react";
import rehypeShiftHeading from "rehype-shift-heading";
import { renderToStaticMarkup } from "react-dom/server";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
import { rehypeEnhanceImages } from "./rehypeEnhanceImages";

// Directory where the posts are (root folder)
const postsDirectory = path.join(process.cwd(), "posts/");

export function parseMarkdown(filePath) {
  /**
   * Parse Markdown from a file
   */
  console.log(`Parsing markdown file: ${filePath}`);

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const matterResults = matter(fileContents);

  const rawDate = matterResults.data.date;
  const dateMs = rawDate ? Date.parse(rawDate) : Date.parse(fs.statSync(filePath).mtime);
  const date = new Date(dateMs).toUTCString();

  return {
    id: path.basename(filePath, ".md"),
    date,
    dateMs,
    ...matterResults.data,
    content: matterResults.content,
  };
}

export function getAllPostIds(type = null) {
  /**
   * Get all posts from a given type
   */
  console.log(`Getting all post IDs${type ? ` for type: ${type}` : ""}`);

  // Gets name to check in Dir
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith(".md")) // Only markdown files
    .map((fileName) => parseMarkdown(path.join(postsDirectory, fileName)))
    .filter((post) => (type ? post.type === type : true)) // Filter by type if specified
    .map((post) => ({
      params: {
        id: post.id,
      },
    }));
}

export function getRecentPosts({ type = null, amount = null, start = 0 } = {}) {
  /**
   * Get recent posts by optional type or amount
   */
  console.log(`Getting recent posts for type: ${type}, amount: ${amount}, start: ${start}`);

  // Reuse `getAllPostIds` to get post metadata with optional type filtering
  const allPosts = getAllPostIds(type).map((entry) => {
    const fullPath = path.join(postsDirectory, `${entry.params.id}.md`);
    return parseMarkdown(fullPath);
  });

  // Sort posts by date
  allPosts.sort((a, b) => b.dateMs - a.dateMs);

  // Default `amount` to include all posts if not specified
  const totalPosts = allPosts.length;
  const sliceAmount = amount === null ? totalPosts : start + amount;

  // Apply pagination
  return allPosts.slice(start, sliceAmount);
}

export async function getPostData(id) {
  /**
   * Get post content for a specific post
   */
  console.log(`Getting content for post ID: ${id}`);

  const fullPath = path.join(postsDirectory, `${id}.md`);
  const post = parseMarkdown(fullPath);

  // Convert Markdown to React components
  const reactContent = (
    await unified()
      .use(remarkParse)
      .use(remarkToc)
      .use(remarkBreaks)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeEnhanceImages)
      .use(rehypeSlug)
      .use(rehypeStarryNight)
      .use(rehypeShiftHeading, { shift: 1 })
      .use(rehypeReact, {
        jsx,
        jsxs,
        Fragment,
        components: {
          img: (props) => (
            <Image
              {...props}
              alt={props.alt || ""}
              src={props.src || ""}
              width={500}
              height={500}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ),
          a: ({ href, children }) => <Link href={href || ""}>{children}</Link>,
        },
      })
      .process(post.content)
  ).result;

  // Serialize React components to static HTML
  const contentHtml = renderToStaticMarkup(reactContent);

  return {
    ...post,
    contentHtml,
  };
}
