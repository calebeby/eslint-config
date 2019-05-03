import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import prettier from 'rollup-plugin-prettier'

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
  '@typescript-eslint/eslint-plugin',
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
  external,
  plugins: [
    nodeResolve({ extensions }),
    json({ preferConst: true, compact: true }),
    commonjs({ extensions }),
    babel(),
    terser({
      mangle: false,
      compress: {
        defaults: true,
        toplevel: true,
        hoist_props: true,
        join_vars: false,
        passes: 3,
        booleans: false,
      },
    }),
    prettier({
      parser: 'babel',
      singleQuote: true,
      semi: false,
      trailingComma: 'all',
    }),
  ],
}
