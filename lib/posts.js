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
import { addCaptionsToImages } from "./addCaptionsToImages";

// Directory where the posts are (root folder)
const postsDirectory = path.join(process.cwd(), "posts/");

// Parse just metadata from Markdown
export function parseMarkdown(filePath) {
  console.log(`Parsing markdown file: ${filePath}`);

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const matterResults = matter(fileContents);

  const rawDate = matterResults.data.date;
  const dateMs = rawDate
    ? Date.parse(rawDate)
    : Date.parse(fs.statSync(filePath).mtime);
  const date = new Date(dateMs).toUTCString();

  return {
    id: path.basename(filePath, ".md"),
    date,
    dateMs,
    ...matterResults.data,
    content: matterResults.content,
  };
}

// Get all post IDs for prerendering with optional type filter
export function getAllPostIds(type = null) {
  console.log(`Getting all post IDs${type ? ` for type: ${type}` : ""}`);

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

// Get all posts (metadata only) with optional type and pagination
export function getRecentPosts({ type = null, amount = null, start = 0 } = {}) {
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

// Get post content for a specific post
export async function getPostData(id) {
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
      .use(addCaptionsToImages)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeStarryNight)
      .use(rehypeShiftHeading, {shift: 1})
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
              className="fullscreen"
            />
          ),
          a: ({ href, children }) => (
            <Link href={href || ""}>
              {children}
            </Link>
          ),
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
