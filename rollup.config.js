import esbuild from 'rollup-plugin-esbuild'
import { babel } from '@rollup/plugin-babel'
import pkg from './package.json'

export const input = 'src/index.js'
export const buildPlugins = [
  babel({
    babelHelpers: 'bundled',
    presets: [['@babel/preset-env', { targets: { ie: '11' } }]]
  }),
  esbuild({ minify: true })
]

export default [
  {
    input,
    output: [
      {
        file: pkg.module,
        format: 'esm'
      },
      {
        file: pkg.module.replace('dist', 'docs'),
        format: 'esm'
      }
    ],
    plugins: buildPlugins
  },
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
      },
      {
        file: pkg.main.replace('dist', 'cypress/tests'),
        format: 'umd',
        name: 'VueSnip'
      }
    ],
    plugins: buildPlugins
  }
]
