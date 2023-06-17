/** @type {import('next').NextConfig} */
// module.exports = {
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.(glb|gltf)$/,
//       use: [
//         {
//           loader: 'file-loader',
//         },
//       ],
//     });

//     return config;
//   },
// };

module.exports = {
  webpack: (config, { isServer }) => {
    const newConfig = Object.assign({}, config, {
      module: Object.assign({}, config.module, {
        rules: config.module.rules.concat([
          {
            test: /\.gltf$/,
            loader: 'raw-loader',
          },
        ]),
      }),
    })
    if (!isServer) {
      newConfig.resolve.fallback.fs = false
    }

    return newConfig
  },
}
