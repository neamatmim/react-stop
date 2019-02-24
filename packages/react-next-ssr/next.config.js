// next.config.js
const { withPlugins, optional } = require('next-compose-plugins');
// const withTM = require('next-transpile-modules');
const withOptimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');
// const typescript = require('@zeit/next-typescript');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

const {
  PHASE_PRODUCTION_BUILD,
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
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Will make webpack look for these modules in parent directories
      'shared-ui': require.resolve('shared-ui/src'),
      // '@your-project/styleguide': require.resolve('@your-project/styleguide'),
      // ...
    };
    return config;
  },
};

module.exports = withPlugins(
  [
    // add a plugin with specific configuration
    // // load and apply a plugin only during development server phase
    [
      optional(() => require('next-transpile-modules')),
      {
        transpileModules: ['shared-ui'],
      },
      [PHASE_DEVELOPMENT_SERVER],
    ],
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
    [
      withBundleAnalyzer,
      {
        analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ['browser', 'both'].includes(
          process.env.BUNDLE_ANALYZE
        ),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: 'static',
            reportFilename: '../bundles/server.html',
          },
          browser: {
            analyzerMode: 'static',
            reportFilename: '../bundles/client.html',
          },
        },
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
  ],
  nextConfig
);
