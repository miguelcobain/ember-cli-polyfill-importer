/* eslint-env node, mocha */
'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-fs'));
const AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;

describe('Include polyfill', function() {
  this.timeout(400000);

  let app;

  before(async function() {
    app = new AddonTestApp();
    await app.create('included', {
      emberVersion: '~3.7.3',
      emberDataVersion: '^3.7.0'
    });
    await app.runEmberCommand('build');
  });

  it('includes polyfill with caniuse test', async function() {
    expect(app.filePath('dist/assets/vendor.js')).to.have.content.that.match(/matchMedia\(\) polyfill/);
  });

  it('includes polyfill with shouldImport test', async function() {
    expect(app.filePath('dist/assets/vendor.js')).to.have.content.that.match(/window\.requestAnimationFrame = function/);
  });

  it('includes polyfill with browserlist test', async function() {
    expect(app.filePath('dist/assets/vendor.js')).to.have.content.that.match(/t\.closest=function\(/);
  });
});
