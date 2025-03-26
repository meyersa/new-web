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
import pino from "pino";

const logger = pino();
const postsDirectory = path.join(process.cwd(), "posts/");

/**
 * Parses a Markdown file and extracts metadata and content.
 *
 * @param {string} filePath - Path to the markdown file.
 * @returns {object} Parsed markdown metadata and content.
 */
export function parseMarkdown(filePath) {
  logger.info(`Parsing markdown file: ${filePath}`);

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

/**
 * Retrieves all post IDs, filtered optionally by type.
 *
 * @param {string|null} type - Optional post type to filter by.
 * @returns {Array<{ params: { id: string } }>} Array of post ID objects.
 */
export function getAllPostIds(type = null) {
  logger.info(`Getting all post IDs${type ? ` for type: ${type}` : ""}`);

  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => parseMarkdown(path.join(postsDirectory, fileName)))
    .filter((post) => (type ? post.type === type : true))
    .map((post) => ({
      params: {
        id: post.id,
      },
    }));
}

/**
 * Returns recent posts sorted by date, with optional type filtering and pagination.
 *
 * @param {object} options
 * @param {string|null} options.type - Optional type to filter posts.
 * @param {number|null} options.amount - Number of posts to return.
 * @param {number} options.start - Starting index for pagination.
 * @returns {Array} List of recent posts.
 */
export function getRecentPosts({ type = null, amount = null, start = 0 } = {}) {
  logger.info(`Getting recent posts for type: ${type}, amount: ${amount}, start: ${start}`);

  const allPosts = getAllPostIds(type).map((entry) => {
    const fullPath = path.join(postsDirectory, `${entry.params.id}.md`);
    return parseMarkdown(fullPath);
  });

  allPosts.sort((a, b) => b.dateMs - a.dateMs);

  const totalPosts = allPosts.length;
  const sliceAmount = amount === null ? totalPosts : start + amount;

  return allPosts.slice(start, sliceAmount);
}

/**
 * Retrieves and processes the markdown content of a specific post.
 *
 * @param {string} id - Post ID (filename without .md extension).
 * @returns {Promise<object>} Object containing metadata and rendered HTML content.
 */
export async function getPostData(id) {
  logger.info(`Getting content for post ID: ${id}`);

  const fullPath = path.join(postsDirectory, `${id}.md`);
  const post = parseMarkdown(fullPath);

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

  const contentHtml = renderToStaticMarkup(reactContent);

  return {
    ...post,
    contentHtml,
  };
}
