import { visit } from "unist-util-visit";
import { getPhotoData } from "./photos";

/**
 * Rehype plugin to enhance <img> with <figure>, <figcaption>, and EXIF data
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
            photoData = await getPhotoData(id, folder, filename);
          } catch (err) {
            console.error("Error fetching photo data", err);
            return;
          }
        }

        const cameraInfo = photoData?.info || {};

        // Attach meta to the figure for parsing later
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
      })();

      promises.push(p);
    });

    await Promise.all(promises);
  };
}
