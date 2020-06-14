import { getComputedLines } from './getComputedLines.js'

const SEPARATOR_SENTENCE = '. '
const SEPARATOR_WORD = ' '
const SEPARATOR_LETTER = ''
const ELLIPSIS = '...'

export class ElementSnipper {
  constructor (el) {
    this.el = el
    this.maxLines = el.__snipText.maxLines
    this.unprocessed = el.__snipText.fullText
    this.processed = ''
  }

  _snipChunks (separator) {
    if (!this.unprocessed) {
      return this
    }

    const chunks = this.unprocessed.split(separator)
    this.unprocessed = chunks.find(chunk => {
      this.el.innerText = `${this.processed}${chunk}${ELLIPSIS}`

      if (!this.isWithinRange()) {
        return true
      }

      this.processed = `${this.processed}${chunk}${separator}`
    })

    return this
  }

  isWithinRange () {
    return getComputedLines(this.el) <= this.maxLines
  }

  snipSentences () {
    return this._snipChunks(SEPARATOR_SENTENCE)
  }

  snipWords () {
    return this._snipChunks(SEPARATOR_WORD)
  }

  snipCharacters () {
    return this._snipChunks(SEPARATOR_LETTER)
  }

  ellipsis () {
    this.el.innerText = `${this.processed.trim()}${ELLIPSIS}`
  }
}
