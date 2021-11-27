import esbuild from 'rollup-plugin-esbuild'
import { babel } from '@rollup/plugin-babel'
import serve from 'rollup-plugin-serve'
import pkg from './package.json'

const input = 'src/index.js'
const plugins = [
  esbuild({ minify: true }),
  babel({ babelHelpers: 'bundled' })
]

if (process.env.NODE_ENV === 'development') {
  plugins.push(serve({ port: 3000, contentBase: 'docs', open: true }))
}

export default () => [
  {
    input,
    output: [
      {
        file: pkg.main,
        format: 'umd',
        name: 'VueSnip'
      },
      {
        file: pkg.main.replace('dist', 'docs'),
        format: 'umd',
        name: 'VueSnip'
      }
    ],
    plugins: plugins
  }
]
