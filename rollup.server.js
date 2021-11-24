import serve from 'rollup-plugin-serve'
import { input, buildPlugins } from './rollup.config'

export default () => {
  const portMap = {
    dev: 9000,
    demo: 9002,
    test: 9001
  }

  const contentBaseMap = {
    dev: 'server/dev',
    demo: 'docs',
    test: 'server/test'
  }

  const contentBase = contentBaseMap[process.env.NODE_ENV]
  const port = portMap[process.env.NODE_ENV]

  return [
    {
      input,
      output: [
        {
          file: `${contentBase}/main.js`,
          format: 'umd',
          name: 'VueSnip'
        }
      ],
      plugins: [...buildPlugins, serve({ port, contentBase })]
    }
  ]
}
