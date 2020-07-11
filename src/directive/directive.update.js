import { normalizeMaxLines } from './directive.utils.js'

export const getUpdate = (state, snipText) => (el, { value, arg }) => {
  const { elementMap, options } = state

  elementMap.get(el).maxLines = normalizeMaxLines(value)
  elementMap.get(el).snipMethod = arg || options.snipMethod
  snipText(el)
}
