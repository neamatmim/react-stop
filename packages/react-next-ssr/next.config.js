// next.config.js
const { withPlugins, optional } = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');
// const typescript = require('@zeit/next-typescript');

const {
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
  PHASE_DEVELOPMENT_SERVER,
  PHASE_EXPORT,
} = require('next/constants');

// next.js configuration
const nextConfig = {
  // useFileSystemPublicRoutes: false,
  // distDir: 'build',
  env: {
    customKey: 'value',
  },
  crossOrigin: 'anonymous',
};

module.exports = withPlugins(
  [
    // add a plugin with specific configuration
    [
      withCSS,
      {
        cssModules: true,
        cssLoaderOptions: {
          localIdentName: '[local]___[hash:base64:5]',
        },
        [PHASE_PRODUCTION_BUILD + PHASE_EXPORT]: {
          cssLoaderOptions: {
            localIdentName: '[hash:base64:8]',
          },
        },
      },
    ],

    // add a plugin without a configuration
    withOptimizedImages,
    [
      withFonts,
      {
        // assetPrefix: 'https://example.com', //You can serve remote resources by setting assetPrefix option.
      },
    ],
    // another plugin with a configuration (applied in all phases except development server)
    // [
    //   typescript,
    //   {
    //     typescriptLoaderOptions: {
    //       transpileOnly: false,
    //     },
    //   },
    //   ['!', PHASE_DEVELOPMENT_SERVER],
    // ],

    // // load and apply a plugin only during development server phase
    // [
    //   optional(() => require('@some-internal/dev-log')),
    //   [PHASE_DEVELOPMENT_SERVER],
    // ],
  ],
  nextConfig
);
