import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkToc from "remark-toc";
import remarkBreaks from "remark-breaks";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeStarryNight from "rehype-starry-night";
import rehypeSlug from "rehype-slug";
import { addCaptionsToImages } from "./addCaptionsToImages";

// Directory where the posts are (root folder)
const postsDirectory = path.join(process.cwd(), "posts/");

// Parse just metadata from Markdown
export function parseMarkdown(filePath) {
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

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkToc) // Table of contents
    .use(remarkBreaks) // Support for line breaks
    .use(addCaptionsToImages) // Add captions
    .use(remarkRehype) // Convert to HTML
    .use(rehypeStarryNight) // Syntax highlighting
    .use(rehypeStringify)
    .use(rehypeSlug) // Add slugs
    .process(post.content);

  return {
    ...post,
    contentHtml: processedContent.toString(),
  };
}
