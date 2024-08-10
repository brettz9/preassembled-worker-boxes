#!/usr/bin/env node

import {cliBasics} from 'command-line-basics';
import preassembledWorkerBoxes from '../src/index.js';

const optionDefinitions = await cliBasics(
  import.meta.dirname + '/../src/optionDefinitions.js',
  {
    packageJsonPath: import.meta.dirname + '/../package.json'
  }
);

if (!optionDefinitions) { // cliBasics handled
  process.exit();
}

try {
  const {/* info, */ logFiles} = await preassembledWorkerBoxes(
    optionDefinitions
  );
  logFiles();
} catch (err) {
  // eslint-disable-next-line no-console -- Report error to user
  console.error(err);
  process.exit();
}
