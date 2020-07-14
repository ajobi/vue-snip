import { elementLines } from '../element/element.lines.js'

const SEPARATOR_SENTENCE = '. '
const SEPARATOR_SUBSENTENCE = ', '
const SEPARATOR_WORD = ' '
const ELLIPSIS = '...'

const snipChunks = (snipProgress, el, maxLines, separator) => {
  if (!snipProgress.unprocessed) {
    return
  }

  const chunks = snipProgress.unprocessed.split(separator)
  snipProgress.unprocessed = chunks.find(chunk => {
    el.textContent = `${snipProgress.processed}${chunk}${ELLIPSIS}`

    if (elementLines(el) > maxLines) {
      return true
    }

    snipProgress.processed = `${snipProgress.processed}${chunk}${separator}`
  })
}

export const snipByJS = (state, el) => {
  const { fullText, maxLines } = state.elementMap.get(el)

  el.textContent = fullText
  el.style = ''

  if (maxLines <= 0 || elementLines(el) <= maxLines) {
    return
  }

  const snipProgress = {
    unprocessed: fullText,
    processed: ''
  }

  snipChunks(snipProgress, el, maxLines, SEPARATOR_SENTENCE)
  snipChunks(snipProgress, el, maxLines, SEPARATOR_SUBSENTENCE)
  snipChunks(snipProgress, el, maxLines, SEPARATOR_WORD)

  el.textContent = `${snipProgress.processed.trim()}${ELLIPSIS}`
}
