# eslint-config-calebeby

Caleb Eby's ESLint Configuration. This exports itself as a "super-plugin"
because of a
[limitation of ESLint](https://github.com/eslint/eslint/issues/3458).

The way this works is that it requires all of the plugin dependencies, and
exports them from this plugin under a prefix.

The plugins that this exposes are:

- [`unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [`import`](https://github.com/benmosher/eslint-plugin-import)
- [`standard`](https://github.com/standard/eslint-plugin-standard)
- [`promise`](https://github.com/xjamundx/eslint-plugin-promise)
- [`node`](https://github.com/mysticatea/eslint-plugin-node)
- [`jest`](https://github.com/jest-community/eslint-plugin-jest)
- [`typescript`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)
- [`react`](https://github.com/yannickcr/eslint-plugin-react)
- [`jsx-a11y`](https://github.com/evcohen/eslint-plugin-jsx-a11y)
- [`react-hooks`](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks)

This also exposes a couple rules from
[`shopify`](https://github.com/shopify/eslint-plugin-shopify):

- [`shopify/prefer-early-return`](https://github.com/Shopify/eslint-plugin-shopify/blob/master/docs/rules/prefer-early-return.md)
- [`shopify/prefer-class-properties`](https://github.com/Shopify/eslint-plugin-shopify/blob/master/docs/rules/prefer-class-properties.md)

To override settings for any of these plugins, you must prefix the configuration
with `caleb/`, because the plugins are exposed through this "super-plugin".

```json
{
  "extends": ["plugin:calebeby/recommended"],
  "rules": {
    "caleb/unicorn/catch-error-name": "off",
    "caleb/shopify/prefer-early-return": "off"
  }
}
```

## Installation

```sh
npm i -D eslint-plugin-caleb eslint prettier
```

## Usage

Add this to your `package.json`:

```json
{
  "scripts": {
    "check-lint": "eslint --ignore-path .gitignore . && prettier --list-different --ignore-path .gitignore '**/*.js'",
    "lint": "eslint --ignore-path .gitignore --fix . && prettier --write --ignore-path .gitignore '**/*.js'"
  },
  "eslintConfig": {
    "extends": ["plugin:caleb/recommended"]
  },
  "prettier": {
    "singleQuote": true,
    "trailingComma": "all",
    "semi": false
  }
}
```

### Configurations

This plugin exposes the following configurations:

- `recommended`: This is the main configuration. This exposes base rules, as
  well as some overrides for `.ts`/`.tsx` files
- `react`: This adds some settings for React-specific rules
- `preact`: This is the same as `react`, except it excludes rules that are
  irrelevant for Preact
- `jest`: This adds some jest rules for test files, and declares the jest
  globals in those files

To include these configurations, add the ones you want to your `extends` array:

```json
["plugin:caleb/recommended", "plugin:caleb/jest"]
```

### Checking on CI

```sh
npm run check-lint
```

### Checking Locally

(this will automatically fix many linting issues)

```sh
npm run lint
```
