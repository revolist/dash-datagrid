import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const localExecutable = path.join(
  packageRoot,
  '.venv',
  process.platform === 'win32' ? 'Scripts' : 'bin',
  process.platform === 'win32'
    ? 'dash-generate-components.exe'
    : 'dash-generate-components',
);
const executable = fs.existsSync(localExecutable)
  ? localExecutable
  : 'dash-generate-components';
const result = spawnSync(
  executable,
  [
    './src/lib/components',
    'dash_datagrid',
    '-p',
    'package-info.json',
    '--ignore',
    '\\.test\\.',
  ],
  {
    cwd: packageRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  },
);

if (result.error) {
  throw result.error;
}
process.exitCode = result.status ?? 1;
