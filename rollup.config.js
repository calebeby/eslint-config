import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
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
  'eslint-plugin-react-hooks',
  'eslint-plugin-jest',
  '@typescript-eslint/eslint-plugin',
  'eslint-plugin-react',
  'eslint-plugin-jsx-a11y',
]

const config = {
  input: 'src/rules.js',
  output: {
    file: 'dist/rules.js',
    format: 'cjs',
    preferConst: true,
    freeze: false,
  },
  treeshake: {
    moduleSideEffects: false,
  },
  external,
  plugins: [
    nodeResolve({ extensions }),
    json({ preferConst: true, compact: true }),
    babel({ babelHelpers: 'bundled' }),
    terser({
      mangle: false,
      compress: {
        unsafe: true,
        defaults: true,
        toplevel: true,
        hoist_props: true,
        join_vars: false,
        passes: 4,
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

export default config
