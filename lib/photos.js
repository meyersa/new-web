/*
 * Internal for getting all photos from a folder
 * Mostly from the NextJS docs
 */

import fs from "fs";
import path from "path";
import { checkDir } from "./checkDir";

// Directory where the posts are (root folder)
const postsDirectory = path.join(process.cwd(), "public/images/");

export async function getAllPhotos(id, dir) {
  /*
   * Get post data from an ID
   * For the individual page pulls
   */
  console.log(`Getting photos for ID ${id} in ${dir}`);

  const combDir = postsDirectory + dir + "/" + id;

  checkDir(combDir);

  const photoNames = fs.readdirSync(combDir);

  return photoNames.filter((filename) => {
    return filename.match("^.*.(?:webp|jpg|jpeg)$");
  }).map((filename) => {
    return ["/images", dir, id, filename].join("/")

  });
}
