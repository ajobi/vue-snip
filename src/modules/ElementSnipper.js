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

      if (!this._isWithinRange()) {
        return true
      }

      this.processed = `${this.processed}${chunk}${separator}`
    })

    return this
  }

  _isWithinRange () {
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
    while ([' ', '.'].includes(this.processed[this.processed.length - 1])) {
      this.processed = this.processed.substring(0, this.processed.length - 1)
    }

    this.el.innerText = `${this.processed}${ELLIPSIS}`
  }
}
