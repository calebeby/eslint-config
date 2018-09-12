module.exports = {
  plugins: [
    '@babel/plugin-transform-shorthand-properties', // this is needed for object function keys to be transpiled so objects get inlined with terser
    [
      '@babel/plugin-proposal-object-rest-spread',
      { loose: true, useBuiltIns: true },
    ],
  ],
}
