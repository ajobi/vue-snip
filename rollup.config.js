import { nodeResolve } from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import serve from 'rollup-plugin-serve'
import pkg from './package.json'

const input = 'src/index.ts'

const plugins = [
  nodeResolve({ extensions: ['.ts'] }),
  babel({ babelHelpers: 'bundled' }),
  terser(),
  ...(process.env.NODE_ENV === 'development' ? [serve({ port: 3000, contentBase: 'docs', open: true })] : [])
]

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
