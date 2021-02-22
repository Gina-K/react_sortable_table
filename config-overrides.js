const { override, addExternalBabelPlugins } = require('customize-cra')

module.exports = override(
  ...addExternalBabelPlugins(
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-syntax-optional-chaining',
    '@babel/plugin-transform-react-jsx'
  )
)