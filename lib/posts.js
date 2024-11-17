/*
 * Internal for rendering markdown pages
 * Mostly from the NextJS docs
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { addCaptionsToImages } from "./addCaptionsToImages";
import rehypeStarryNight from 'rehype-starry-night'
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";
import remarkBreaks from "remark-breaks";
import { unified } from "unified";
import { checkDir } from "./checkDir";

// Directory where the posts are (root folder)
const postsDirectory = path.join(process.cwd(), "posts/");

export function getSortedPostsData(dir) {
  /*
   * Returns posts sorted by data - I think.. Lol
   */
  console.log(`Getting sortedPostsData for ${dir}`);

  checkDir(postsDirectory + dir);

  const fileNames = fs.readdirSync(postsDirectory + dir);

  const allPostsData = fileNames
    .filter((fileName) => {
      // Only looking for Markdown files
      return fileName.match(".*md");
    })
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory + dir, fileName);

      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Using Matter to parse Markdown
      const matterResult = matter(fileContents);

      // Parsing date
      const rawDate = matterResult.data.date;
      var date = null;
      var dateMs = null;

      if (rawDate == null) {
        dateMs = Date.parse(fs.statSync(fullPath).mtime);
        date = new Date(dateMs).toUTCString();
      } else {
        dateMs = Date.parse(rawDate);
        date = new Date(dateMs).toUTCString();
      }

      console.log(`Returning sortedPostsData for ${dir}`);

      return {
        id,
        date,
        dateMs,
        ...matterResult.data,
      };
    });

  // Sort func
  return allPostsData.sort((a, b) => {
    if (a.dateMs < b.dateMs) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds(dir) {
  /*
   * Returns all post IDs in a directory
   * Needed for NextJS prerendering
   */
  console.log(`Getting allPostIDs for ${dir}`);

  checkDir(postsDirectory + dir);

  const fileNames = fs.readdirSync(postsDirectory + dir);

  console.log(`Returning all post IDs for ${dir}`);

  return fileNames
    .filter((fileName) => {
      // Only looking for Markdown files
      return fileName.match(".*md");
    })
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ""),
        },
      };
    });
}

export async function getPostData(id, dir) {
  /*
   * Get post data from an ID
   * For the individual page pulls
   */
  console.log(`Getting postData for ID ${id} in ${dir}`);

  checkDir(postsDirectory + dir);

  const fullPath = path.join(postsDirectory + dir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const rawDate = matterResult.data.date;
  var date = null;

  if (rawDate == null) {
    const dateMs = Date.parse(fs.statSync(fullPath).mtime);
    date = new Date(dateMs).toUTCString();
  } else {
    date = new Date(Date.parse(rawDate)).toUTCString();
  }

  const processedContent = await unified()
    .use(remarkParse) // Parse into remark
    .use(remarkToc) // Add Table of Contents
    .use(remarkBreaks) // Linebreak support
    .use(addCaptionsToImages) // Add captions to images
    .use(remarkRehype) // Transform into rehype
    .use(rehypeStarryNight) // Code block
    .use(rehypeStringify) // Parse back
    .use(rehypeSlug) // Add slugs to IDs
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  console.log(`Returning postData for ID ${id} in ${dir}`);

  return {
    date,
    contentHtml,
    ...matterResult.data,
  };
}
