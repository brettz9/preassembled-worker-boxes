import {join, dirname} from 'path';
import {fileURLToPath} from 'url';

import sinon from 'sinon';

import preassembledWorkerBoxes from '../src/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @param {string} file
 * @returns {string}
 */
function getFixturePath (file) {
  return join(__dirname, 'fixtures', file);
}

describe('preassembledWorkerBoxes', function () {
  beforeEach(function () {
    this.sinon = sinon.createSandbox();
  });
  afterEach(function () {
    this.sinon.restore();
  });

  it('Bakes in resources (with no imports) and logFiles', async function () {
    const {
      info, additionalManifestEntries, logFiles
    } = await preassembledWorkerBoxes({
      file: getFixturePath('fetches.js')
    });
    // console.log('info', info);

    expect(additionalManifestEntries).to.have.lengthOf(3);
    expect(additionalManifestEntries).to.include.members([
      './test1.json',
      './test2.json'
    ]);
    expect(additionalManifestEntries[2]).to.match(
      /test\/fixtures\/fetches\.js/u
    );

    expect(info.filePaths).to.have.lengthOf(4);
    expect(info.filePaths[0]).to.match(/sw\.js\.map$/u);
    expect(info.filePaths[1]).to.match(/sw\.js$/u);
    expect(info.filePaths[2]).to.match(/workbox-[^.]*\.js.map$/u);
    expect(info.filePaths[3]).to.match(/workbox-[^.]*\.js$/u);

    expect(info.count).to.equal(3);
    expect(info.warnings).to.have.lengthOf(1);
    expect(info.warnings[0]).to.include('without revisioning info');
    expect(info.size).to.equal(0);

    this.sinon.spy(console, 'log');
    logFiles();
    /* eslint-disable no-console -- Testing */
    expect(console.log.calledWith(
      'File count', 3
    )).to.equal(true);
    expect(console.log.calledWith(
      'Combined size in bytes of all precached entries', 0
    )).to.equal(true);
    expect(console.log.calledWithMatch(
      'Paths of precached entry files'
    )).to.equal(true);

    const arr = console.log.getCall(2).lastArg;
    /* eslint-enable no-console -- Testing */
    expect(arr[0]).to.have.string('/sw.js.map');
    expect(arr[1]).to.have.string('/sw.js');
    expect(arr[2]).to.have.string('/workbox-f905291c.js.map');
    expect(arr[3]).to.have.string('/workbox-f905291c.js');
  });

  it('Bakes in resources (single import)', async function () {
    const {info, additionalManifestEntries} = await preassembledWorkerBoxes({
      file: getFixturePath('importer.js')
    });
    // console.log('info', info);

    expect(additionalManifestEntries).to.have.lengthOf(4);
    expect(additionalManifestEntries).to.include.members([
      './test1.json',
      './test2.json'
    ]);
    expect(additionalManifestEntries[2]).to.match(/test\/fixtures\/importer\.js/u);
    expect(additionalManifestEntries[3]).to.match(/test\/fixtures\/fetches\.js/u);

    expect(info.filePaths).to.have.lengthOf(4);
    expect(info.filePaths[0]).to.match(/sw\.js\.map$/u);
    expect(info.filePaths[1]).to.match(/sw\.js$/u);
    expect(info.filePaths[2]).to.match(/workbox-[^.]*\.js.map$/u);
    expect(info.filePaths[3]).to.match(/workbox-[^.]*\.js$/u);

    expect(info.count).to.equal(4);
    expect(info.warnings).to.have.lengthOf(1);
    expect(info.warnings[0]).to.include('without revisioning info');
    expect(info.size).to.equal(0);
  });

  it('Bakes in resources (with custom `queryModule`)', async function () {
    const {info, additionalManifestEntries} = await preassembledWorkerBoxes({
      file: getFixturePath('file-with-custom-items.js'),
      queryOptions: {
        queryModule: './test/fixtures/queryModule.js'
      }
    });
    // console.log('info', info);

    expect(additionalManifestEntries).to.have.lengthOf(4);
    expect(additionalManifestEntries).to.include.members([
      './test1.json',
      './test2.json',
      './test7.json'
    ]);
    expect(additionalManifestEntries[3]).to.match(
      /test\/fixtures\/file-with-custom-items\.js/u
    );

    expect(info.filePaths).to.have.lengthOf(4);
    expect(info.filePaths[0]).to.match(/sw\.js\.map$/u);
    expect(info.filePaths[1]).to.match(/sw\.js$/u);
    expect(info.filePaths[2]).to.match(/workbox-[^.]*\.js.map$/u);
    expect(info.filePaths[3]).to.match(/workbox-[^.]*\.js$/u);

    expect(info.count).to.equal(4);
    expect(info.warnings).to.have.lengthOf(1);
    expect(info.warnings[0]).to.include('without revisioning info');
    expect(info.size).to.equal(0);
  });

  it(
    'Bakes in resources (with custom `queryModule` set in `config`)',
    async function () {
      const {info, additionalManifestEntries} = await preassembledWorkerBoxes({
        file: getFixturePath('file-with-custom-items.js'),
        config: './test/fixtures/config.js'
      });
      // console.log('info', info);

      expect(additionalManifestEntries).to.have.lengthOf(4);
      expect(additionalManifestEntries).to.include.members([
        './test1.json',
        './test2.json',
        './test7.json'
      ]);
      expect(additionalManifestEntries[3]).to.match(
        /test\/fixtures\/file-with-custom-items\.js/u
      );

      expect(info.filePaths).to.have.lengthOf(4);
      expect(info.filePaths[0]).to.match(/sw\.js\.map$/u);
      expect(info.filePaths[1]).to.match(/sw\.js$/u);
      expect(info.filePaths[2]).to.match(/workbox-[^.]*\.js.map$/u);
      expect(info.filePaths[3]).to.match(/workbox-[^.]*\.js$/u);

      expect(info.count).to.equal(4);
      expect(info.warnings).to.have.lengthOf(1);
      expect(info.warnings[0]).to.include('without revisioning info');
      expect(info.size).to.equal(0);
    }
  );
});
