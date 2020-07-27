const path = require('path')

module.exports = (env, args) => {
  const testDevServer = process.env.NODE_ENV === 'test'

  return {
    entry: {
      'dist/main': './src/index.js',
      'docs/main': './src/index.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './'),
      library: 'VueSnip',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    },
    devServer: {
      contentBase: testDevServer ? 'server/test' : args.demo ? 'docs' : 'server/dev',
      port: testDevServer ? 9001 : 9000,
      open: !testDevServer
    }
  }
}
