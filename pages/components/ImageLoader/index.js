import Image from "next/image";
import pino from "pino";

const logger = pino({ name: "ImageLoader" });

const DEFAULT_ALT = "No alt text provided";
const DEFAULT_HEIGHT = 500;
const DEFAULT_WIDTH = 500;

/**
 * Renders an optimized image with optional CDN transformation.
 *
 * @param {Object} props
 * @param {string} props.src - Image source path or URL.
 * @param {string} [props.alt] - Alt text for the image.
 * @param {number} [props.height] - Image height in pixels.
 * @param {number} [props.width] - Image width in pixels.
 * @param {boolean} [props.priority] - Whether the image should be prioritized by Next.js.
 * @param {number} [props.quality] - Image quality (1–100) for CDN transformation.
 * @param {string} [props.blurUrl] - Optional base64-encoded blur placeholder.
 * @returns {JSX.Element|null} The rendered Image component or null if src is missing.
 */
export default function ImageLoader({
  src = "",
  alt = DEFAULT_ALT,
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
  priority = false,
  quality = 100,
  blurUrl,
}) {
  if (!src) {
    logger.warn({ src }, "Image src is empty, returning null");
    return null;
  }

  const isDev = process.env.NODE_ENV === "development";
  const isLocal = !src.startsWith("http") && !src.startsWith("//");
  const cdnBase = "https://cdn.meyersa.com/";

  /**
   * If a loader should be used, if not then use built in
   */
  const useCDN = !isDev && isLocal;
  const loader = useCDN
    ? ({ src }) => `${cdnBase}cdn-cgi/image/format=auto,quality=${quality}/${src.replace(/^\//, "")}`
    : undefined;

  logger.info(
    {
      originalSrc: src,
      finalSrc: loader ? loader({ src }) : src,
      alt,
      height,
      width,
      priority,
      quality,
      isDev,
      isLocal,
      useCDN,
    },
    "Rendering image"
  );

  return (
    <Image
      src={src}
      alt={alt}
      height={height}
      width={width}
      priority={priority}
      placeholder={blurUrl ? "blur" : undefined}
      blurDataURL={blurUrl}
      loader={loader}
    />
  );
}
