import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(directory, '..');
const source = path.join(
  packageRoot,
  'src/lib/components/RevoGrid.react.js',
);
const destination = path.join(
  packageRoot,
  'dash_datagrid/RevoGrid.react.js',
);

fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.copyFileSync(source, destination);
