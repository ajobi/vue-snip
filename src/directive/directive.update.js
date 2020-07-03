export const getUpdate = (state, snipText) => (el, { value, arg }) => {
  const { elementMap, options } = state

  elementMap.get(el).maxLines = value
  elementMap.get(el).method = arg || options.snipMethod
  snipText(el)
}
