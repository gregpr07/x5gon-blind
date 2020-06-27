// next.config.js
const withImages = require("next-images");
module.exports = withImages();

/* 
module.exports = {
  assetPrefix: '/example'
}
This will prepend /example to all the built assets, so instead of /_next/pages/xyz you will link to /example/_next/pages/xyz. With this update you can remove the /_next proxy on the proxy side and your buildable assets (scripts, stylesheets, etc.) should still load.
*/
