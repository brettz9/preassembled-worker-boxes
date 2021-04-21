'use strict';

const workboxBuild = require('workbox-build');
const findESResources = require('find-es-resources');

/**
 * @external EsFileTraverseOptions
 * @see {@link https://github.com/brettz9/es-file-traverse}
 */

/**
* @typedef {external:EsFileTraverseOptions} PreassembledWorkerBoxesOptions
* @property {string} [swDest="sw.js"]
*/

/**
 * @type {PreassembledWorkerBoxesOptions} options
 * @returns {Promise<void>}
 */
async function preassembledWorkerBoxes (options) {
  const {
    file,
    findESResourcesOptions,
    workboxBuildOptions,
    queryOptions,
    swDest = 'sw.js'
  } = options;

  const additionalManifestEntries = await findESResources(
    file, findESResourcesOptions, queryOptions
  );

  // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build
  const info = await workboxBuild.generateSW({
    swDest,
    ...workboxBuildOptions,
    additionalManifestEntries: [...new Set([
      ...(workboxBuildOptions?.additionalManifestEntries || []),
      ...additionalManifestEntries
    ])]
  });

  return {
    info,
    additionalManifestEntries,
    logFiles () {
      const {warnings, count, size, filePaths} = info;

      warnings.forEach((warning) => {
        // eslint-disable-next-line no-console -- CLI
        console.warn('Warning', warning);
      });

      // eslint-disable-next-line no-console -- CLI
      console.log('File count', count);

      // eslint-disable-next-line no-console -- CLI
      console.log('Combined size in bytes of all precached entries', size);

      // eslint-disable-next-line no-console -- CLI
      console.log('Paths of precached entry files', filePaths);
    }
  };
}

module.exports = preassembledWorkerBoxes;
