export const getUpdate = (state, snipText) => (el, { value }) => {
  const { elementMap } = state

  elementMap.get(el).maxLines = value
  snipText(el)
}
