// @vitest-environment node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import viteConfig from '../vite.config.mjs';
import packageManifest from '../package.json' with { type: 'json' };

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const runtimeSpecifier =
  '@revolist/stencil-dash-output-target/runtime';

describe('standalone package ownership', () => {
  it('declares the DOM environment used by bridge tests', () => {
    expect(packageManifest.devDependencies['happy-dom']).toBeTruthy();
  });

  it('resolves the private bridge runtime inside the Dash package', () => {
    const runtimePath = viteConfig.resolve.alias[runtimeSpecifier];

    expect(runtimePath).toBe(
      path.join(packageRoot, 'src/lib/runtime.js'),
    );
    expect(fs.existsSync(runtimePath)).toBe(true);
  });
});
