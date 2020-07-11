import { normalizeMaxLines, normalizeSnipMethod } from '../utils'

export const getUpdate = (state, snipText) => (el, { value, arg }) => {
  const { elementMap } = state

  elementMap.get(el).maxLines = normalizeMaxLines(state, value)
  elementMap.get(el).snipMethod = normalizeSnipMethod(state, arg)
  snipText(el)
}
