import { SnipOptions } from './types'

export const defaultOptions: SnipOptions = {
  directiveName: 'snip',
  snipMethod: 'css',
  maxLines: 3,
  separators: ['. ', ', ', ' ', ''],
  ellipsis: '.\u200A.\u200A.',
  debugMode: false,
  exposeSnipFunction: false,
  snipFunctionName: 'snipText'
}
