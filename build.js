const prettier = require('prettier')
const { writeFileSync } = require('fs')
const { join, sep } = require('path')

const { configs, environments } = require('./src/config')

const resolveStart = '__REQUIRE_RESOLVE__'
const resolveEnd = '__END_REQUIRE_RESOLVE'
const stringify = data =>
  `module.exports = ${JSON.stringify(data, (k, v) => {
    if (k === 'parser' && v.startsWith(__dirname)) {
      return (
        resolveStart +
        v
          .replace(join(__dirname, 'node_modules' + sep), '')
          .replace(/\/.*$/, '') +
        resolveEnd
      )
    }
    return v
  })}`.replace(
    new RegExp('"' + resolveStart + '(.*?)' + resolveEnd + '"', 'g'),
    (_match, replacement) => {
      return `require.resolve("${replacement}")`
    },
  )

const createFile = data =>
  prettier.format(stringify(data), {
    parser: 'babel',
    singleQuote: true,
    semi: false,
  })

writeFileSync(join('dist', 'config.js'), createFile({ configs, environments }))
