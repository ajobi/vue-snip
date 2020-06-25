const path = require('path')

module.exports = (env, argv) => {
  const { testDevServer } = argv

  return {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'VueSnipText',
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
