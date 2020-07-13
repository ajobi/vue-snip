export const getUnbind = (state) => (el) => {
  const { elementMap } = state

  elementMap.get(el).observer.disconnect()
  elementMap.delete(el)
}
