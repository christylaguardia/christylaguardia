module.exports = {
  target: 'serverless',
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/:year',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:year/:month',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:year/:month/:day',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
