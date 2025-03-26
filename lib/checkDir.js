import fs from "fs";
import pino from "pino";

const logger = pino();

/**
 * Validates the provided directory path.
 *
 * Ensures the path is not null and that the directory exists on the file system.
 * Throws an error if validation fails.
 *
 * @param {string} dir - The directory path to validate.
 * @returns {boolean} - Returns true if the directory is valid.
 * @throws {Error} - If the directory is null or does not exist.
 */
export function checkDir(dir) {
  logger.info(`Checking directory ${dir}`);

  if (dir == null) {
    logger.error("Directory is null");
    throw new Error("Cannot have null dir");
  }

  if (!fs.existsSync(dir)) {
    logger.error(`Directory does not exist: ${dir}`);
    throw new Error("DIR does not exist");
  }

  logger.info(`Passed dir validation for ${dir}`);
  return true;
}