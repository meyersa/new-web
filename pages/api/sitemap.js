import { getRecentPosts } from "../../lib/posts";
import pino from "pino";

const logger = pino();

/**
 * API handler to generate a dynamic sitemap for SEO
 *
 * Fetches recent posts, generates URLs for each post type,
 * and returns a complete sitemap in XML format.
 */
export default async function handler(req, res) {
  try {
    logger.info("Generating sitemap");

    const posts = getRecentPosts();

    const photographyUrls = posts
      .filter((post) => post.type === "photography")
      .map(
        (post) => `
        <url>
          <loc>https://meyersa.com/photography/${post.id}</loc>
          <lastmod>${new Date(post.date).toISOString()}</lastmod>
          <priority>0.7</priority>
        </url>
      `
      )
      .join("");

    const projectUrls = posts
      .filter((post) => post.type === "projects")
      .map(
        (post) => `
        <url>
          <loc>https://meyersa.com/projects/${post.id}</loc>
          <lastmod>${new Date(post.date).toISOString()}</lastmod>
          <priority>0.7</priority>
        </url>
      `
      )
      .join("");

    const now = new Date().toISOString();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://meyersa.com/</loc>
        <lastmod>${now}</lastmod>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://meyersa.com/photography</loc>
        <lastmod>${now}</lastmod>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://meyersa.com/projects</loc>
        <lastmod>${now}</lastmod>
        <priority>0.8</priority>
      </url>
      ${photographyUrls}
      ${projectUrls}
    </urlset>
    `;

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(sitemap);
    logger.info("Sitemap generated successfully");
  } catch (error) {
    logger.error({ err: error }, "Failed to generate sitemap");
    res.status(500).json({ error: "Failed to generate sitemap" });
  }
}
