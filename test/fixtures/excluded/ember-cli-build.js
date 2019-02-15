'use strict';

// eslint-disable-next-line
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    tests: false,
    // Add options here
    polyfills: {
      'matchmedia-polyfill': {
        files: ['matchMedia.js'],
        caniuse: 'matchmedia'
      },
      'raf-polyfill': {
        files: ['raf.js'],
        shouldImport() {
          return false;
        }
      },
      'element-closest': {
        files: ['browser.js'],
        browsers: ['ie 9', 'chrome 52']
      }
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
