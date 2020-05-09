const xo = require('eslint-config-xo')
const standard = require('eslint-config-standard')
const prettier = require('eslint-config-prettier')
const prettierUnicorn = require('eslint-config-prettier/unicorn')
const prettierStandard = require('eslint-config-prettier/standard')
const prettierTypescript = require('eslint-config-prettier/@typescript-eslint')
const prettierReact = require('eslint-config-prettier/react')
const unicorn = require('eslint-plugin-unicorn')
const importPlugin = require('eslint-plugin-import')
const node = require('eslint-plugin-node')
const jest = require('eslint-plugin-jest')
const react = require('eslint-plugin-react')
const jsxA11y = require('eslint-plugin-jsx-a11y')
const typescript = require('@typescript-eslint/eslint-plugin')

/**
 * @param {{[key: string]: any}} rules the rules to process
 */
const prefix = (rules) =>
  Object.entries(rules).reduce((output, [key, value]) => {
    if (key.includes('/')) key = 'caleb/' + key
    output[key] = value
    return output
  }, {})

const hoist = (prefix, rules) =>
  Object.entries(rules).reduce((output, [key, value]) => {
    output[prefix + '/' + key] = value
    return output
  }, {})

const removeUnused = (rules) =>
  Object.entries(rules).reduce((output, [key, value]) => {
    if (
      value === 'off' ||
      value === 0 ||
      value[0] === 'off' ||
      value[0] === 0
    ) {
      return output
    }
    output[key] = value
    return output
  }, {})

module.exports.environments = hoist('jest', jest.environments)

module.exports.configs = {
  recommended: {
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
    env: {
      node: true,
      es6: true,
    },
    globals: {
      document: false,
      navigator: false,
      window: false,
    },
    plugins: ['caleb'],
    rules: removeUnused(
      prefix({
        // plugins' recommended configs
        ...unicorn.configs.recommended.rules,
        ...importPlugin.configs.recommended.rules,
        ...node.configs.recommended.rules,

        // "standards"
        ...xo.rules,
        ...standard.rules,

        // prettier undoes stylistic rules
        ...prettier.rules,
        ...prettierUnicorn.rules,
        ...prettierStandard.rules,

        // overrides
        'valid-jsdoc': 'off',
        'no-return-assign': ['error'],
        'guard-for-in': 'off', // this is annoying and often unnecessary
        'max-len': 'off', // prettier sometimes chooses to allow lines to exceed max, it is fine
        'func-names': 'off',
        'node/no-unpublished-require': 'off',
        'node/no-unpublished-import': 'off',
        'node/no-missing-import': 'off', // doesn't work with ts files, and we have eslint-plugin-import for this
        'no-unused-vars': [
          'error',
          {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: true,
          },
        ],
        'prefer-const': 'error',
        'object-shorthand': ['error', 'properties'],
        radix: ['error', 'as-needed'], // parseInt should not need base 10, it is the default
        'capitalized-comments': 'off',
        'padding-line-between-statements': 'off',
        'node/no-unsupported-features/es-syntax': 'off',
        'node/no-unsupported-features/es-builtins': 'off',
        'max-params': ['warn', 6],
        'lines-between-class-members': 'off', // this is silly imo
        'node/shebang': 'off', // tons of false positives
        'shopify/prefer-early-return': 'error',
        'shopify/prefer-class-properties': 'error',
        'unicorn/prevent-abbreviations': 'off', // I like abbreviations
        'unicorn/consistent-function-scoping': 'off', // I like the idea of this rule, but it seems like it triggers too often in cases where the code is "correct"
        'no-else-return': [
          'error',
          {
            allowElseIf: true,
          },
        ],
        'no-await-in-loop': 'off', // Sometimes I want to await in a loop. I don't see why this is a problem
        'no-async-promise-executor': 'off', // it is convenient sometimes to await in promise executor
      }),
    ),
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        parser: require.resolve('@typescript-eslint/parser'), // this is resolved from here, rather than from the config consumer
        parserOptions: {
          project: './tsconfig.json',
        },
        settings: importPlugin.configs.typescript.settings,
        rules: prefix({
          ...typescript.configs['eslint-recommended'].overrides[0].rules,
          ...typescript.configs.recommended.rules,
          ...typescript.configs['recommended-requiring-type-checking'].rules,
          ...prettierTypescript.rules,

          'import/no-unresolved': 'off', // TS can handle this
          'import/export': 'off', // TS is better at this, and this rule is SLOW
          'import/named': 'off', // TS handles this, and this rules is SLOW
          'import/namespace': 'off', // TS handles this, and this rule is SLOW
          'import/default': 'off', // TS handles this, this rule is SLOW
          'import/no-named-as-default-member': 'off', // TS checks this, and this rule is SLOW
          'import/no-named-as-default': 'off', // TS checks this, and this rule is SLOW

          'node/no-extraneous-import': 'off', // TS checks this, this rule is SLOW

          'no-import-assign': 'off', // TS handles this

          '@typescript-eslint/array-type': [
            'error',
            { default: 'array', readonly: 'array' }, // Force T[] or readonly T[] instead of Array<T> or ReadonlyArray<T>
          ],

          '@typescript-eslint/explicit-function-return-type': 'off', // inference is usually useful
          '@typescript-eslint/no-explicit-any': 'off', // any is often necessary
          '@typescript-eslint/no-use-before-define': 'off',
          '@typescript-eslint/no-empty-interface': 'off', // usually this just pops up in the middle of me working on something. Does not provide value
          '@typescript-eslint/unbound-method': 'off', // unbound methods are often fine
          '@typescript-eslint/no-misused-promises': 'off', // disregarding a promise value doesn't mean it is being misused

          '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        }),
      },
    ],
  },
  react: {
    plugins: ['caleb'],
    rules: prefix({
      ...react.configs.all.rules,
      ...jsxA11y.configs.recommended.rules,
      ...prettierReact.rules,

      'react/require-render-return': 'off', // this is broken for render props called `render`

      // silly rules to disable
      'react/jsx-no-literals': 'off',
      'react/jsx-no-bind': 'off', // we want bind for render props
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.js', '.jsx', '.tsx'] },
      ],
      'react/no-multi-comp': ['error', { ignoreStateless: true }],
      'react/destructuring-assignment': 'off',
      'react/require-optimization': 'off',
      'react/no-set-state': 'off',
      'react/jsx-max-depth': ['error', { max: 10 }],
      'react/jsx-sort-props': 'off', // off for now, may change later if there is better autofix for options
      'react/jsx-curly-brace-presence': 'off', // It incorrectly flags text nodes that have whitespace on the ends
      'react/forbid-component-props': 'off', // not sure about this rule atm
      'react/jsx-handler-names': 'off', // not sure about this rule atm
      'react/button-has-type': 'off',
      'react/prop-types': 'off', // prop types are bad. Use ts or flow
      'react/jsx-props-no-spreading': 'off', // props spreading is fine
      'react/state-in-constructor': 'off', // allow for class properties
      'react/display-name': 'off', // this is annoying with `memo()`

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',

      'jsx-a11y/label-has-for': 'off', // deprecated
      'jsx-a11y/label-has-associated-control': 'off', // cannot handle nested custom form element
    }),
  },
  preact: {
    plugins: ['caleb'],
    settings: { react: { pragma: 'h', version: '16' } },
    extends: 'plugin:caleb/react',
    rules: prefix({
      'react/no-unknown-property': 'off', // preact uses class, for, and dashed svg attributes
      'react/no-deprecated': 'off', // preact API is not the same as react
      'react/no-unused-state': 'off', // does not account for destructuring params to render()
    }),
  },
  jest: {
    plugins: ['caleb'],
    overrides: [
      {
        files: ['__tests__/**', '*.{test,spec}.{t,j}s{x,}'],
        env: prefix({ 'jest/globals': true }),
        rules: prefix({
          ...jest.configs.recommended.rules,
          ...jest.configs.style.rules,
        }),
      },
    ],
  },
}
