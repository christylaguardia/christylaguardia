module.exports = {
  images: {
    domains: ['images.ctfassets.net'],
  },

  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
