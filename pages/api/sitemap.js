import { getRecentPosts } from "../../lib/posts"; // Adjust the import path accordingly

export default async function handler(req, res) {
  try {
    // Fetch recent posts
    const posts = getRecentPosts();

    // Generate URLs for photography and projects
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

    // Generate the complete sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://meyersa.com/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://meyersa.com/photography</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://meyersa.com/projects</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.8</priority>
      </url>
      ${photographyUrls}
      ${projectUrls}
    </urlset>
    `;

    // Set the response header and send the sitemap
    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(sitemap);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate sitemap" });
  }
}
