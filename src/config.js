const xo = require('eslint-config-xo')
const standard = require('eslint-config-standard')
const prettier = require('eslint-config-prettier')
const prettierUnicorn = require('eslint-config-prettier/unicorn')
const prettierStandard = require('eslint-config-prettier/standard')
const prettierReact = require('eslint-config-prettier/react')
const unicorn = require('eslint-plugin-unicorn')
const importPlugin = require('eslint-plugin-import')
const node = require('eslint-plugin-node')
const jest = require('eslint-plugin-jest')
const react = require('eslint-plugin-react')
const jsxA11y = require('eslint-plugin-jsx-a11y')

/**
 * @param {{[key: string]: any}} rules the rules to process
 * @param {false} removeUnused whether to remove rules set to 'off' or 0
 */
const prefix = rules =>
  Object.entries(rules).reduce((output, [key, val]) => {
    if (key.includes('/')) key = 'caleb/' + key
    output[key] = val
    return output
  }, {})

const hoist = (prefix, rules) =>
  Object.entries(rules).reduce((output, [key, val]) => {
    output[prefix + '/' + key] = val
    return output
  }, {})

const removeUnused = rules =>
  Object.entries(rules).reduce((output, [key, val]) => {
    if (val === 'off' || val === 0 || val[0] === 'off' || val[0] === 0) {
      return output
    }
    output[key] = val
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
        'no-unused-vars': [
          'error',
          {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: true,
          },
        ],
        'object-shorthand': ['error', 'properties'],
        radix: ['error', 'as-needed'], // parseInt should not need base 10, it is the default
        'capitalized-comments': 'off',
        'node/no-unsupported-features/es-syntax': 'off',
        'node/no-unsupported-features/es-builtins': 'off',
        'max-params': ['warn', 6],
        'lines-between-class-members': 'off', // this is silly imo
        'node/shebang': 'off', // tons of false positives
        'shopify/prefer-early-return': 'error',
        'shopify/prefer-class-properties': 'error',
      }),
    ),
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        parser: require.resolve('typescript-eslint-parser'), // this is resolved from here, rather than from the config consumer
        rules: prefix({
          'import/export': 'off',
          'no-undef': 'off', // super buggy with interfaces
          'import/no-unresolved': 'off', // maybe look into https://github.com/benmosher/eslint-plugin-import/blob/master/README.md#resolvers
          'no-unused-vars': 'off', // too often broken. ts can handle this
          'no-restricted-globals': 'off', // broken with interfaces (for example `interface Foo {event: string}`)
          'unicorn/prefer-spread': 'off', // ts has problems with this for querySelectorAll
          'import/named': 'off', // this does not work for type imports; ts handles this
          'import/namespace': 'off', // this does not work for type imports; ts handles this
          'promise/param-names': 'off', // this does not work with typescript's noUnusedLocals because ts wants resolve to start with _

          'typescript/no-angle-bracket-type-assertion': 'error',
          'typescript/no-inferrable-types': 'error',
          'typescript/no-non-null-assertion': 'error',
          'typescript/no-parameter-properties': 'error',
          'typescript/no-triple-slash-reference': 'error',
          'typescript/no-var-requires': 'error',
        }),
      },
      {
        files: '*.d.ts{x,}',
        rules: prefix({
          'no-use-before-define': 'off', // this is very annoying and unnecessary in .d.ts files
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
      'react/jsx-max-depth': ['error', { max: 5 }],
      'react/jsx-sort-props': 'off', // off for now, may change later if there is better autofix for options
      'react/forbid-component-props': 'off', // not sure about this rule atm
      'react/jsx-handler-names': 'off', // not sure about this rule atm
      'react/button-has-type': 'off',
      'react/prop-types': 'off', // prop types are bad. Use ts or flow

      'jsx-a11y/label-has-for': 'off', // deprecated
      'jsx-a11y/label-has-associated-control': 'off', // cannot handle nested custom form element
    }),
  },
  preact: {
    plugins: ['caleb'],
    settings: { react: { pragma: 'h', version: '16' } },
    extends: 'plugin:caleb/react',
    rules: prefix({
      'react/no-unknown-property': ['error', { ignore: ['class', 'for'] }],
      'react/no-deprecated': 'off', // preact API is not the same as react
      'react/no-unused-state': 'off', // does not account for destructuring params to render()
    }),
  },
  jest: {
    plugins: ['caleb'],
    overrides: {
      files: ['__tests__/**', '*.{test,spec}.{t,j}s{x,}'],
      env: prefix({
        'jest/globals': true,
      }),
      rules: prefix(jest.configs.recommended.rules),
    },
  },
}
