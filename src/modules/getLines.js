export const getLines = el => {
  const computedStyle = window.getComputedStyle(el)

  const computedHeight = parseInt(computedStyle.height)
  const computedLineHeight = computedStyle.lineHeight === 'normal'
    ? parseInt(computedStyle.fontSize) * 1.2
    : parseInt(computedStyle.lineHeight)

  return Math.ceil(computedHeight / computedLineHeight)
}
