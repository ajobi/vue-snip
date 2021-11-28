export interface SnipOptions {
  directiveName?: string
  snipMethod?: 'css' | 'js'
  maxLines?: number
  separators?: string[],
  ellipsis?: string
  debugMode?: boolean
  exposeSnipFunction?: boolean
  snipFunctionName?: string
}

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
