module.exports = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: 'github.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
        permanent: true
      }
    ]
  }
};
