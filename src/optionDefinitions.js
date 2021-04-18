'use strict';

const pkg = require('../package.json');

const JSONParser = JSON.parse.bind(JSON);

const getChalkTemplateSingleEscape = (s) => {
  return s.replace(/[{}\\]/gu, (ch) => {
    return `\\u${ch.codePointAt().toString(16).padStart(4, '0')}`;
  });
};

// Todo: We really need a comamnd-line-args-TO-typedef-jsdoc generator!
//  Might see about https://github.com/dsheiko/bycontract/
/* eslint-disable jsdoc/require-property -- Should get property from schema */
/**
* @typedef {PlainObject} PreassembledWorkerBoxesOptions
*/
/* eslint-enable jsdoc/require-property -- Should get property from schema */

const optionDefinitions = [
  {
    name: 'file', type: String, multiple: true,
    defaultOption: true,
    description: 'Repeat for each file or file glob you wish to be added and ' +
    'checked for reference resource files to add. ' +
      'Required.',
    typeLabel: '{underline file path}'
  },
  {
    name: 'swDest', type: String, alias: 'o',
    multiple: true,
    description: 'Path to which to save the worker file. Defaults to `sw.js`.',
    typeLabel: '{underline service-worker destination path}'
  },
  {
    name: 'findESResourcesOptions', type: JSONParser,
    description: 'Options to pass to `find-es-resources` (and then onto ' +
      '`es-file-traverse`). Note that `file` and `callback` on this object ' +
      'have no effect. Defaults to ' +
      getChalkTemplateSingleEscape(
        '`{"node": "true"}`'
      ) +
      ' and use of our main `file` and a special `callback`.',
    typeLabel: '{underline JSON object string}'
  },
  {
    name: 'workboxBuildOptions', type: JSONParser,
    description: 'Additional options to pass to `workbox-build`. Note that ' +
      '`additionalManifestEntries` will be merged with those discovered by ' +
      'this library. You can set `swDest` to override this library\'s.'
  }
];

const cliSections = [
  {
    // Add italics: `{italic textToItalicize}`
    content: pkg.description +
      '\n\n{italic pwb|preassembled-worker-boxes [--swDest path] file1.js ' +
        'fileGlob*}'
  },
  {
    optionList: optionDefinitions
  }
];

exports.definitions = optionDefinitions;
exports.sections = cliSections;
