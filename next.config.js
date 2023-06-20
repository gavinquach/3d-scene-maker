/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

module.exports = withPlugins([withImages], {
  webpack: (config, { isServer }) => {
    const newConfig = Object.assign({}, config, {
      module: Object.assign({}, config.module, {
        rules: config.module.rules.concat([
          {
            test: /\.gltf$/,
            loader: 'raw-loader',
          },
          {
            test: /\.(hdr|gif|png|jpe?g)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  publicPath: '/_next',
                  outputPath: 'static/images/',
                  name: '[name].[hash].[ext]',
                },
              },
            ],
          }
        ]),
      }),
    });
    if (!isServer) {
      newConfig.resolve.fallback.fs = false;
    }

    return newConfig;
  },
});
