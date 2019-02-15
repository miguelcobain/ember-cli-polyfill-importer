ember-cli-polyfill-importer
==============================================================================

Ember-CLI addon to add a polyfills based on caniuse tests, specific browsers (browserlist) or custom logic.

caniuse and browserlist tests are made against app's `targets.js`.
If those tests fail, the polyfill/script won't be imported.


Compatibility
------------------------------------------------------------------------------

* Ember CLI v2.15 or above


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
    }
  }
});
// ..
```

You can also use this addon as another addon dependency. To do that, make sure that `ember-cli-polyfill-importer`
is in your `dependencies` and not `devDependencies` and provide configuration in your `index.js` file like:

```js
// index.js
module.exports = {
  name: require('./package').name,
  options: {
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
    }
  }
};
```

caniuse test is done using https://github.com/nyalab/caniuse-api project.
browserlist test is done using https://github.com/browserslist/browserslist project.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
