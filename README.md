# ember-cli-polyfill-importer

[![Build Status](https://travis-ci.org/miguelcobain/ember-cli-polyfill-importer.svg?branch=master)](https://travis-ci.org/miguelcobain/ember-cli-polyfill-importer)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-polyfill-importer.svg)](https://emberobserver.com/addons/ember-cli-polyfill-importer)
[![npm version](https://badge.fury.io/js/ember-cli-polyfill-importer.svg)](https://badge.fury.io/js/ember-cli-polyfill-importer)

Ember-CLI addon to add a polyfills based on caniuse tests, specific browsers (browserlist) or custom logic.

caniuse and browserlist tests are made against app's `targets.js`.
If those tests fail, the polyfill/script won't be imported.

It will also use the fastbootShim transformation while importing, if `ember-cli-fastboot` is installed in the host app.


Compatibility
------------------------------------------------------------------------------

* Ember CLI v2.15 or above (2.16 is required for using app.import transformation options)


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-polyfill-importer
```


Usage
------------------------------------------------------------------------------

Just install your polyfill npm package and add configuration as follows:

```js
// ember-cli-build.js
// ..
let app = new EmberApp(defaults, {
  // Add options here
  polyfills: {
    // key is the package name
    'matchmedia-polyfill': {
      files: ['matchMedia.js'], // files array relative to package's root
      caniuse: 'matchmedia' // can i use test name
    },
    'raf-polyfill': {
      files: ['raf.js'],
      shouldImport(targets) {
        // targets is the host app browser targets
        return false; // or your custom test
      }
    },
    'element-closest': {
      files: ['browser.js'],
      browsers: ['ie 9', 'chrome 52'] // browserlist array of browsers query in which to include the polyfill
      // optionally, you can define the options to use when calling app.import
      importOptions: { }
    }
  }
});
// ..
```

You can also use this addon as another addon dependency. To do that, make sure that `ember-cli-polyfill-importer`
and the polyfill npm package are in your `dependencies` and not `devDependencies` and provide configuration in your `index.js` file like:

```js
// index.js
module.exports = {
  name: require('./package').name,
  options: {
    // key is the package name
    'matchmedia-polyfill': {
      files: ['matchMedia.js'], // files array relative to package's root
      caniuse: 'matchmedia' // can i use test name
    },
    'raf-polyfill': {
      files: ['raf.js'],
      shouldImport(targets) {
        // targets is the host app browser targets
        return false; // or your custom test
      }
    },
    'element-closest': {
      files: ['browser.js'],
      browsers: ['ie 9', 'chrome 52'] // browserlist array of browsers query in which to include the polyfill
      // optionally, you can define the options to use when calling app.import
      importOptions: { }
    }
  }
};
```

caniuse test is done using https://github.com/nyalab/caniuse-api project.
browserlist test is done using https://github.com/browserslist/browserslist project.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
