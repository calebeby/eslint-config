import { rules as unicorn } from 'eslint-plugin-unicorn'
import { rules as importPlugin } from 'eslint-plugin-import'
import { rules as promise } from 'eslint-plugin-promise'
import { rules as node } from 'eslint-plugin-node'
import { rules as standardPlugin } from 'eslint-plugin-standard'
import { rules as jest } from 'eslint-plugin-jest'
import { rules as typescript } from '@typescript-eslint/eslint-plugin'
import { rules as react } from 'eslint-plugin-react'
import { rules as jsxA11y } from 'eslint-plugin-jsx-a11y'
import { rules as reactHooks } from 'eslint-plugin-react-hooks'
import preferEarlyReturn from 'eslint-plugin-shopify/lib/rules/prefer-early-return'
import preferClassProperties from 'eslint-plugin-shopify/lib/rules/prefer-class-properties'

const hoist = (prefix, rules) =>
  Object.entries(rules).reduce((output, [key, value]) => {
    output[prefix + '/' + key] = value
    return output
  }, {})

const rules = {
  ...hoist('unicorn', unicorn),
  ...hoist('import', importPlugin),
  ...hoist('standard', standardPlugin),
  ...hoist('promise', promise),
  ...hoist('node', node),
  ...hoist('jest', jest),
  ...hoist('@typescript-eslint', typescript),
  ...hoist('react', react),
  ...hoist('jsx-a11y', jsxA11y),
  ...hoist('react-hooks', reactHooks),
  'shopify/prefer-early-return': preferEarlyReturn,
  'shopify/prefer-class-properties': preferClassProperties,
}

export default rules
