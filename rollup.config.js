import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const extensions = ['.mjs', '.js', '.json', '.node']

const external = [
  'path',
  'fs',
  'util',
  'crypto',
  'module',
  'tty',
  'net',
  'assert',
  'url',
  'constants',
  'stream',
  'eslint-plugin-unicorn',
  'eslint-plugin-import',
  'eslint-plugin-promise',
  'eslint-plugin-node',
  'eslint-plugin-standard',
  'eslint-plugin-jest',
  'eslint-plugin-typescript',
  'eslint-plugin-react',
  'eslint-plugin-jsx-a11y',
]

export default {
  input: 'src/rules.js',
  output: {
    file: 'dist/rules.js',
    format: 'cjs',
    freeze: false,
  },
  external: external,
  plugins: [
    nodeResolve({ extensions }),
    commonjs(),
    json({ preferConst: true, extensions }),
    babel({
      include: 'node_modules/eslint-plugin-shopify/**',
    }),
    terser({
      compress: {
        toplevel: true,
        passes: 3,
        pure_getters: true,
      },
      output: {
        beautify: true,
        indent_level: 2,
      },
    }),
  ],
}
