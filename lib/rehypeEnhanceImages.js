import { visit } from "unist-util-visit";
import { getPhotoData } from "./photos";
import pino from "pino";

const logger = pino();

/**
 * Rehype plugin to enhance <img> tags with <figure>, <figcaption>, and EXIF metadata.
 *
 * - Wraps <img> in <figure>
 * - Adds <figcaption> using the image alt text
 * - Adds EXIF metadata as data attributes on the <figure>
 */
export function rehypeEnhanceImages() {
  return async (tree) => {
    const promises = [];

    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "img") return;

      const { src: url, alt } = node.properties || {};
      if (!alt || !url || !url.startsWith("/images/")) return;

      const p = (async () => {
        let photoData = null;
        const segments = url.split("/").filter(Boolean);

        if (segments.length >= 4) {
          const [, folder, id, filename] = segments;

          try {
            logger.info({ id, folder, filename }, "Fetching photo metadata");
            photoData = await getPhotoData(id, folder, filename);
          } catch (err) {
            logger.error({ err, url }, "Error fetching photo data");
            return;
          }
        }

        const cameraInfo = photoData?.info || {};

        // Construct <figure> with metadata and <figcaption>
        const figure = {
          type: "element",
          tagName: "figure",
          properties: {
            className: ["fullscreen"],
            ...(cameraInfo && {
              "data-camera": cameraInfo.Camera,
              "data-lens": cameraInfo.Lens,
              "data-iso": cameraInfo.ISO,
              "data-aperture": cameraInfo.Aperture,
              "data-shutter": cameraInfo.Shutter_Speed,
            }),
          },
          children: [
            { ...node },
            {
              type: "element",
              tagName: "figcaption",
              children: [{ type: "text", value: alt }],
            },
          ],
        };

        parent.children[index] = figure;
        logger.info({ src: url }, "Enhanced image with figure and EXIF");
      })();

      promises.push(p);
    });

    await Promise.all(promises);
  };
}
