import esbuild from 'rollup-plugin-esbuild'
import pkg from './package.json'

export const input = 'src/index.js'
export const buildPlugins = [esbuild({ minify: true })]

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
      }
    ],
    plugins: buildPlugins
  }
]
