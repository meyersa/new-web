import { getPlaiceholder } from "plaiceholder";
import path from "path";
import fs from "fs";

const photoDirectory = path.join(process.cwd(), "public/");

// Function to generate blurDataURL from an image path with plaiceholder
export async function getBlurData(imagePath) {
  const photoPath = path.join(photoDirectory, imagePath);

  try {
    console.log(`Reading file: ${photoPath}`);

    // Read the file as a buffer
    const buffer = fs.readFileSync(photoPath);

    // Generate base64 placeholder
    const { base64 } = await getPlaiceholder(buffer);

    return base64;
  } catch (error) {
    console.error("Error generating blurDataURL:", error);
    return null; // Fallback to no blur if something goes wrong
  }
}
