import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';

const directory = path.dirname(fileURLToPath(import.meta.url));
const runtimeAlias = path.resolve(directory, 'src/lib/runtime.js');

export default defineConfig({
  resolve: {
    alias: {
      '@revolist/stencil-dash-output-target/runtime': runtimeAlias,
    },
  },
  build: {
    lib: {
      entry: path.resolve(directory, 'src/lib/index.js'),
      name: 'dash_datagrid',
      formats: ['es', 'umd'],
      fileName: format =>
        format === 'es' ? 'dash-datagrid.js' : 'dash_datagrid.min.js',
    },
    outDir: path.resolve(directory, 'dash_datagrid'),
    emptyOutDir: false,
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      external: ['react', 'react-dom', 'prop-types'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'prop-types': 'PropTypes',
        },
      },
    },
  },
});
