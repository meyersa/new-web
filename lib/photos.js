import path from "path";
import ExifReader from "exifreader";
import fs from "fs";
import pino from "pino";

const logger = pino();
const postsDirectory = path.join(process.cwd(), "public/images/");

/**
 * Retrieves metadata and formatted alt text for a given image file.
 *
 * - Extracts EXIF data (Camera, Lens, ISO, Aperture, Shutter Speed)
 * - Generates alt text from the filename
 *
 * @param {string} id - The photo's folder ID.
 * @param {string} dir - Subdirectory name.
 * @param {string} filename - Image filename.
 * @returns {Promise<Object>} - Object with image path, alt text, and photo info.
 */
export async function getPhotoData(id, dir, filename) {
  const filePath = path.join(postsDirectory, dir, id, filename);
  logger.info(`Reading EXIF data from ${filePath}`);

  try {
    const res = await ExifReader.load(filePath);

    const newName = filename
      .split("-")
      .map(name => {
        const baseName = name.split(".")[0];
        return baseName.charAt(0).toUpperCase() + baseName.slice(1);
      })
      .join(" ");

    const photoInfo = {
      Camera: res["Model"]?.description,
      Lens: res["LensProfileName"]?.description.match(/\((.*?)(?= [A-Z0-9]{4,},)/)?.[1],
      ISO: res["ISOSpeedRatings"]?.description,
      Aperture: res["FNumber"]?.description,
      Shutter_Speed: res["ExposureTime"]?.description,
    };

    return {
      img: ["/images", dir, id, filename].join("/"),
      alt: newName,
      info: photoInfo,
    };
  } catch (error) {
    logger.error({ err: error }, `Error reading EXIF data from ${filePath}`);
    return null;
  }
}

/**
 * Filters and loads photo data from a directory.
 *
 * - Reads image files from the given directory
 * - Applies optional filtering by allowed filenames
 * - Returns metadata for each image
 *
 * @param {string} id - The photo's folder ID.
 * @param {string} dir - Subdirectory name.
 * @param {string[]} allowedFilenames - Optional list of filenames to include.
 * @returns {Promise<Object[]>} - Array of photo data objects.
 */
export async function getFilteredPhotos(id, dir, allowedFilenames = []) {
  const combDir = path.join(postsDirectory, dir, id);
  logger.info(`Reading photos from directory: ${combDir}`);

  try {
    const photoNames = fs.readdirSync(combDir).filter(name => name.match(/\.(webp|jpg|jpeg)$/));

    const filtered = allowedFilenames.length
      ? allowedFilenames
      : photoNames.sort();

    return Promise.all(
      filtered.map(filename => getPhotoData(id, dir, filename))
    );
  } catch (error) {
    logger.error({ err: error }, `Error reading photos from directory: ${combDir}`);
    return [];
  }
}
