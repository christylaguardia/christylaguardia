module.exports = {
  images: {
    domains: ['images.ctfassets.net'],
  },

  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
