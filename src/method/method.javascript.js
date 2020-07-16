import { elementLines } from '../element/element.lines.js'

export const snipByJS = (state, el) => {
  const { fullText, maxLines } = state.elementMap.get(el)
  const { ellipsis, separators } = state.options

  el.textContent = fullText
  el.style = ''

  if (maxLines <= 0 || elementLines(el) <= maxLines) {
    return
  }

  const snipProgress = {
    unprocessed: fullText,
    processed: ''
  }

  separators.forEach(separator => {
    snipProgress.unprocessed = snipProgress.unprocessed.split(separator).find(chunk => {
      el.textContent = `${snipProgress.processed}${chunk}${ellipsis}`

      if (elementLines(el) > maxLines) {
        return true
      }

      snipProgress.processed = `${snipProgress.processed}${chunk}${separator}`
    })
  })

  el.textContent = `${snipProgress.processed.trim()}${ellipsis}`
}
