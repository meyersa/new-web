/*
 * Internal for getting all photos from a folder
 * Mostly from the NextJS docs
 */

import fs from "fs";
import path from "path";
import { checkDir } from "./checkDir";
import ExifReader from "exifreader";

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

  return Promise.all(
    photoNames
      .filter((filename) => {
        return filename.match("^.*.(?:webp|jpg|jpeg)$");
      })
      .map(async (filename) => {
        const res = await ExifReader.load(combDir + "/" + filename);

        const photoInfo = {
          Camera: res["Model"].description,
          Lens: res["LensProfileName"].description.match(new RegExp("\\((.*?)(?= [A-Z0-9]{4,},)"))[1],
          ISO: res["ISOSpeedRatings"].description,
          Aperture: res["FNumber"].description,
          Shutter_Speed: res["ExposureTime"].description,
        };

        return {
          img: ["/images", dir, id, filename].join("/"),
          info: photoInfo,
        };
      })
  );
}
