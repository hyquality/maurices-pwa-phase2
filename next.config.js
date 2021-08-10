const withPWA = require("next-pwa");
const path = require('path')
module.exports = withPWA({
  target: "serverless",
  pwa: {
    dest: "public",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'sass')],
  },
});
