import esbuild from 'rollup-plugin-esbuild'
import serve from 'rollup-plugin-serve'
import pkg from './package.json'

const input = 'src/index.js'

export default () => {
  const plugins = [
    esbuild({ minify: true })
  ]

  if (process.env.NODE_ENV === 'development') {
    plugins.push(serve({ port: 3000, contentBase: 'docs', open: true }))
  }

  return [
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
      plugins: plugins
    }
  ]
}
