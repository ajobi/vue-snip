const path = require('path')

module.exports = () => {
  const testDevServer = process.env.NODE_ENV === 'test'

  return {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
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
      contentBase: testDevServer ? 'dev/test' : 'dev/playground',
      port: testDevServer ? 9001 : 9000,
      open: !testDevServer
    }
  }
}
