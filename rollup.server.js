import serve from 'rollup-plugin-serve'
import { input, buildPlugins } from './rollup.config'

export default (args) => {
  const isTest = process.env.NODE_ENV === 'test'
  const isDemo = args.demo
  const contentBase = isTest ? 'server/test' : isDemo ? 'docs' : 'server/dev'
  const port = isTest ? 9001 : isDemo ? 9002 : 9000

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
      plugins: [...buildPlugins, serve({
        port, contentBase
      })]
    }
  ]
}
