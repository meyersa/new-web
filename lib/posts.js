/*
 * Internal for rendering markdown pages
 * Mostly from the NextJS docs
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { addCaptionsToImages } from "./addCaptionsToImages";
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'

// Directory where the posts are (root folder)
const postsDirectory = path.join(process.cwd(), "posts/");

export function checkDir(dir) {
  /*
   * Dir validation
   *
   * Since they can come from many directories, we validate if that exists or not just to be safe
   *
   * Dir should not be null and the directory should exist
   */
  console.log(`Checking directory ${dir}`);

  if (dir == null) {
    throw new Error("Cannot have null dir");
  }

  if (!fs.existsSync(postsDirectory + dir)) {
    throw new Error("DIR does not exist");
  }

  console.log(`Passed dir validation for ${dir}`);
  return true;
}

export function getSortedPostsData(dir) {
  /*
   * Returns posts sorted by data - I think.. Lol
   */
  console.log(`Getting sortedPostsData for ${dir}`);

  checkDir(dir);

  const fileNames = fs.readdirSync(postsDirectory + dir);

  const allPostsData = fileNames
    .filter((fileName) => {
      // Only looking for Markdown files
      return fileName.match(".*md");
    })
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory + dir, fileName);

      // Parsing date
      const dateMs = Date.parse(fs.statSync(fullPath).mtime);
      const date = new Date(dateMs).toUTCString();
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Using Matter to parse Markdown
      const matterResult = matter(fileContents);

      console.log(`Returning sortedPostsData for ${dir}`);

      return {
        id,
        dateMs,
        date,
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

  checkDir(dir);

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

  checkDir(dir);

  const fullPath = path.join(postsDirectory + dir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const dateMs = Date.parse(fs.statSync(fullPath).mtime);
  const date = new Date(dateMs).toUTCString();

  const matterResult = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(addCaptionsToImages)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  console.log(`Returning postData for ID ${id} in ${dir}`);

  return {
    id,
    date,
    dateMs,
    contentHtml,
    ...matterResult.data,
  };
}
