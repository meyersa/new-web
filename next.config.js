const isDev = process.env.NODE_ENV === "development";

module.exports = {
  output: "standalone",
  images: isDev
    ? {
        remotePatterns: [
          {
            hostname: "github.com",
          },
          {
            hostname: "localhost",
          },
        ],
      }
    : {
        loader: "custom",
        loaderFile: "./lib/cfLoader.js",
        remotePatterns: [
          {
            hostname: "github.com",
          },
          {
            hostname: "cdn.meyersa.com",
          },
        ],
      },
  async redirects() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
        permanent: true,
      },
    ];
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  // assetPrefix: isDev ? '' : 'https://cdn.meyersa.com',
};
