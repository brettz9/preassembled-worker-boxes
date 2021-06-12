#!/usr/bin/env node
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';

import {cliBasics} from 'command-line-basics';
import preassembledWorkerBoxes from '../src/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const optionDefinitions = await cliBasics(
  join(__dirname, '../src/optionDefinitions.js')
);

if (!optionDefinitions) { // cliBasics handled
  process.exit();
}

(async () => {
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
})();
