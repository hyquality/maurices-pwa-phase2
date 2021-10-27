const path = require('path');
//const appWebpack = require(path.join(process.cwd()));
module.exports = {
  "stories": [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)"
    //"../stories/**/*.stories.mdx",
   // "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-controls',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async config => {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      ...[path.resolve(process.cwd(), "src")],
    ];
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
     // ...appWebpack().resolve.alias,
      '@': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, '../components'),
      '@lib': path.resolve(__dirname, '../lib'),
      '@styles': path.resolve(__dirname, '../styles'),
      '@sass': path.resolve(__dirname, '../sass'),
      '@schemes': path.resolve(__dirname, '../schemes'),
      '@public': path.resolve(__dirname, '../public'),
    };
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    });

    return config;
  },
}