/*
 * Util to check to see if a directory is valid
 */
import fs from "fs";

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

  if (!fs.existsSync(dir)) {
    throw new Error("DIR does not exist");
  }

  console.log(`Passed dir validation for ${dir}`);
  return true;
}
