export type SnipMethod = 'css' | 'js'
export type MaxLines = number

export interface SnipOptions {
  directiveName?: string
  snipMethod?: SnipMethod
  maxLines?: MaxLines
  separators?: string[],
  ellipsis?: string
  debugMode?: boolean
  exposeSnipFunction?: boolean
  snipFunctionName?: string
}

export interface ElementState {
  fullText: string
  maxLines: MaxLines
  snipMethod: SnipMethod
  prevWidth?: number
  prevHeight?: number
  observer?: ResizeObserver
}

export interface VueSnipState {
  elementMap: WeakMap<HTMLElement, ElementState>
  options: SnipOptions
}

export type SnipText = (el: HTMLElement) => void
