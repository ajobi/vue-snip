export const getDirectiveName = (state) => {
  const { options } = state

  // TODO: research restrictions on name and provide reasonable fallback if criteria are not met
  return options.directiveName
}
