import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const versionFlag = process.argv.indexOf('--version');
const version = versionFlag === -1 ? undefined : process.argv[versionFlag + 1];

if (!version) {
  console.error('Error: Please provide a version using --version');
  process.exit(1);
}

function updateJson(relativePath) {
  const filePath = path.join(directory, relativePath);
  const value = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  value.version = version;
  if (value.dependencies?.['@revolist/revogrid']) {
    value.dependencies['@revolist/revogrid'] = version;
  }
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function updatePyproject() {
  const filePath = path.join(directory, 'pyproject.toml');
  const value = fs.readFileSync(filePath, 'utf8');
  const projectVersion =
    /(\[project\][\s\S]*?\nversion = ")[^"]+(")/;
  if (!projectVersion.test(value)) {
    throw new Error('Could not locate [project] version in pyproject.toml');
  }
  const updated = value.replace(projectVersion, `$1${version}$2`);
  fs.writeFileSync(filePath, updated);
}

updateJson('package.json');
updateJson('package-info.json');
if (fs.existsSync(path.join(directory, 'dash_datagrid/package-info.json'))) {
  updateJson('dash_datagrid/package-info.json');
}
updatePyproject();
console.log(`Updated Dash npm and Python package versions to ${version}`);
