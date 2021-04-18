'use strict';

const {join} = require('path');

const preassembledWorkerBoxes = require('../src/index.js');

/**
 * @param {string} file
 * @returns {string}
 */
function getFixturePath (file) {
  return join(__dirname, 'fixtures', file);
}

describe('findESResources', function () {
  it('Bakes in resources (with no imports)', async function () {
    const {info} = await preassembledWorkerBoxes({
      file: getFixturePath('fetches.js')
    });
    console.log('info', info);

    expect(info.filePaths).to.have.lengthOf(3);
    expect(info.filePaths).to.include.members([
      './test1.json',
      './test2.json'
    ]);
    expect(info.filePaths[2]).to.match(/test\/fixtures\/fetches\.js/u);

    expect(info.count).to.have.lengthOf(3);
    expect(info.warnings).to.have.lengthOf(0);
    expect(info.size).to.equal(99999999);
  });

  it('Bakes in resources (single import)', async function () {
    const {info} = await preassembledWorkerBoxes({
      file: getFixturePath('importer.js')
    });

    expect(info.filePaths).to.have.lengthOf(4);
    expect(info.filePaths).to.include.members([
      './test1.json',
      './test2.json'
    ]);
    expect(info.filePaths[2]).to.match(/test\/fixtures\/importer\.js/u);
    expect(info.filePaths[3]).to.match(/test\/fixtures\/fetches\.js/u);

    expect(info.count).to.have.lengthOf(4);
    expect(info.warnings).to.have.lengthOf(0);
    expect(info.size).to.equal(99999999);
  });
});
