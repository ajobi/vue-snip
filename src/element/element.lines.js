const UA_LINE_HEIGHT = 1.2

export const elementLines = el => {
  const computedStyle = window.getComputedStyle(el)
  const computedHeight = parseInt(computedStyle.height)
  const computedLineHeight = computedStyle.lineHeight === 'normal'
    ? parseInt(computedStyle.fontSize) * UA_LINE_HEIGHT
    : parseInt(computedStyle.lineHeight)

  return Math.ceil(computedHeight / computedLineHeight)
}
