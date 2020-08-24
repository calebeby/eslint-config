# eslint-plugin-caleb

## 11.0.0

### Major Changes

- [`5042cde`](https://github.com/calebeby/eslint-config/commit/5042cdef2fb1fea68228baf1a0a834e4b68a04bd) [#248](https://github.com/calebeby/eslint-config/pull/248) Thanks [@calebeby](https://github.com/calebeby)! - Enable 3 `@typescript-eslint` rules:

  - [`@typescript-eslint/no-unnecessary-boolean-literal-compare`](https://github.com/typescript-eslint/typescript-eslint/blob/v3.9.0/packages/eslint-plugin/docs/rules/no-unnecessary-boolean-literal-compare.md)
  - [`@typescript-eslint/no-unnecessary-condition`](https://github.com/typescript-eslint/typescript-eslint/blob/v3.9.0/packages/eslint-plugin/docs/rules/no-unnecessary-condition.md)
  - [`@typescript-eslint/no-unnecessary-type-arguments`](https://github.com/typescript-eslint/typescript-eslint/blob/v3.9.0/packages/eslint-plugin/docs/rules/no-unnecessary-type-arguments.md)

* [`dc8012b`](https://github.com/calebeby/eslint-config/commit/dc8012b184a1cbb58bd188448519f451cc11298e) [#235](https://github.com/calebeby/eslint-config/pull/235) Thanks [@calebeby](https://github.com/calebeby)! - Drop support for eslint v6

- [`ea13efd`](https://github.com/calebeby/eslint-config/commit/ea13efd1925ed254a45741bda1ac42cb2c9df4d1) [#233](https://github.com/calebeby/eslint-config/pull/233) Thanks [@calebeby](https://github.com/calebeby)! - Enable [`import/no-anonymous-default-export`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-anonymous-default-export.md)

* [`1dbb89e`](https://github.com/calebeby/eslint-config/commit/1dbb89ea70e45ba85c2b0cc539b838bac463092b) [#249](https://github.com/calebeby/eslint-config/pull/249) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependency `eslint-plugin-react-hooks` to v4.1.0

  **New Violations**: Warn when dependencies change on every render ([#19590](https://github.com/facebook/react/pull/19590))

- [`e7ce78b`](https://github.com/calebeby/eslint-config/commit/e7ce78b8ed2e6e77023063b95ef99cdf54be653e) [#236](https://github.com/calebeby/eslint-config/pull/236) Thanks [@calebeby](https://github.com/calebeby)! - Drop support for node 10

* [`008cf27`](https://github.com/calebeby/eslint-config/commit/008cf277ae5e73bff289182069ea7954590eeb72) [#239](https://github.com/calebeby/eslint-config/pull/239) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependency eslint-plugin-react to `v7.20.6`

  This could be breaking because this update [adds support for checking for unused component prop types in extended types](https://github.com/yannickcr/eslint-plugin-react/pull/2721). While this is a bugfix, it could fail on existing code.

### Minor Changes

- [`7567514`](https://github.com/calebeby/eslint-config/commit/7567514140721f4f296299e42a54bdc5a9237265) [#238](https://github.com/calebeby/eslint-config/pull/238) Thanks [@calebeby](https://github.com/calebeby)! - Add support for preact fragments syntax

* [`45ab87c`](https://github.com/calebeby/eslint-config/commit/45ab87cc5f7a06e0059c8703c74bf49fcc0b4342) Thanks [@calebeby](https://github.com/calebeby)! - Disable `import/no-duplicates` for `.d.ts` files

## 10.0.2

### Patch Changes

- [`d25433f`](https://github.com/calebeby/eslint-config/commit/d25433f81533761ae5dfcba8e6eb858149c7abda) [#231](https://github.com/calebeby/eslint-config/pull/231) Thanks [@calebeby](https://github.com/calebeby)! - Fix running build before publish

## 10.0.1

### Patch Changes

- [`760bbab`](https://github.com/calebeby/eslint-config/commit/760bbabcb7c7a73111dbffc361232e9cec3e656a) [#228](https://github.com/calebeby/eslint-config/pull/228) Thanks [@calebeby](https://github.com/calebeby)! - Test release

## 10.0.0

### Major Changes

- 0854083: Update a lot of rules
