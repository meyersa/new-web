import { getPlaiceholder } from "plaiceholder";
import path from "path";
import fs from "fs";
import pino from "pino";

const logger = pino();
const photoDirectory = path.join(process.cwd(), "public/");

/**
 * Generates a base64 blurDataURL for a given image path.
 *
 * This is used in Next.js for optimizing image loading performance.
 *
 * @param {string} imagePath - Relative path to the image within the public directory.
 * @returns {Promise<string|null>} - A base64-encoded placeholder or null on failure.
 */
export async function getBlurData(imagePath) {
  const photoPath = path.join(photoDirectory, imagePath);

  try {
    logger.info(`Reading file: ${photoPath}`);

    const buffer = fs.readFileSync(photoPath);
    const { base64 } = await getPlaiceholder(buffer);

    return base64;
  } catch (error) {
    logger.error({ err: error }, "Error generating blurDataURL");
    return null;
  }
}
