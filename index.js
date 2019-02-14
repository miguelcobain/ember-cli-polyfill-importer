'use strict';

const path = require('path');
const caniuse = require('caniuse-api');
const browserslist = require('browserslist');

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);
    this.performImports();
  },

  performImports() {
    let options = this.getOptions();
    let importer = this.import ? this : findHost(this);
    let browsers = this.project.targets && this.project.targets.browsers;

    Object.keys(options).forEach((packageName) => {
      let packageOptions = options[packageName];

      if (this.shouldImportPackage(packageOptions, browsers)) {
        let files = packageOptions.file || [];

        files.forEach((f) => {
          importer.import(path.join('node_modules', packageName, f));
        });
      }
    });
  },

  shouldImportPackage(opt, browsers) {
    if (!browsers) {
      // if ember-cli version doesn't support targets, include the polyfill to be safe
      return true;
    }

    let caniuseFeature = opt.caniuse;

    // include if not supported
    let caniuseTest = caniuseFeature && !caniuse.isSupported(caniuseFeature, browsers);

    // include if shouldImport returns true
    let shouldImportTest = typeof opt.shouldImport === 'function' && opt.shouldImport(browsers);

    let targetBrowsers = browserslist(browsers);
    let shouldIncludeBrowsers = browserslist(opt.browsers || []);

    let browserlistTest = shouldIncludeBrowsers.some((b) => {
      return targetBrowsers.includes(b);
    });
    console.log('will import', caniuseTest || browserlistTest || shouldImportTest);
    return caniuseTest || browserlistTest || shouldImportTest;
  },

  getOptions() {
    if (!this._options) {
      let userOptions = this.app ? this.app.options : this.parent.options;
      let polyfillOptions = userOptions && userOptions.polyfills || {};
      this._options = polyfillOptions;
    }
    return this._options;
  }
};

function findHost(addon) {
  let current = addon;
  let app;

  do {
    app = current.app || app;
  } while (current.parent.parent && (current = current.parent));

  return app;
}
