const cdnBase = "https://cdn.meyersa.com";

/**
 * Cloudflare Image Loader
 */
const normalizeSrc = (src) => {
    return src.startsWith("/") ? src.slice(1) : src;
};

export default function cloudflareLoader({ src, width, quality }) {
    const isAlreadyCDN = src.includes('/cdn-cgi/image/');
    const cleanSrc = isAlreadyCDN
      ? src.replace(/^https?:\/\/cdn\.meyersa\.com\/cdn-cgi\/image\/[^/]+\/(.+)$/, '/$1')
      : src;

    const params = [`width=${width}`];
    if (quality) {
        params.push(`quality=${quality}`);
    }
    const paramsString = params.join(",");
    
    return `${cdnBase}/cdn-cgi/image/format=auto,${paramsString}/${normalizeSrc(cleanSrc)}`;
}
