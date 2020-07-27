const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')

module.exports = (env, args) => {
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
    plugins: [
      new FileManagerPlugin({
        onEnd: {
          copy: [
            {
              source: './dist',
              destination: './docs'
            }
          ]
        }
      })
    ],
    devServer: {
      contentBase: testDevServer ? 'server/test' : args.demo ? 'docs' : 'server/dev',
      port: testDevServer ? 9001 : 9000,
      open: !testDevServer
    }
  }
}
