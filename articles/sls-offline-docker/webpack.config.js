const { join } = require('path')
const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs',
    path: join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/env', { targets: { node: '8.10' } }]
              ],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread'
              ]
            }
          }
        ]
      }
    ]
  }
}
