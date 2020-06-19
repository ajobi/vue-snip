import { elementLines } from './element.lines.js'

const SEPARATOR_SENTENCE = '. '
const SEPARATOR_WORD = ' '
const SEPARATOR_LETTER = ''

export class ElementSnipper {
  constructor (el, state) {
    this.el = el
    this.ellipsisSymbol = state.options.ellipsis
    this.maxLines = state.elementMap.get(el).maxLines
    this.unprocessed = state.elementMap.get(el).fullText
    this.processed = ''
    el.innerText = this.unprocessed
  }

  _snipChunks (separator) {
    if (!this.unprocessed) {
      return this
    }

    const chunks = this.unprocessed.split(separator)
    this.unprocessed = chunks.find(chunk => {
      this.el.innerText = `${this.processed}${chunk}${this.ellipsisSymbol}`

      if (!this.isWithinRange()) {
        return true
      }

      this.processed = `${this.processed}${chunk}${separator}`
    })

    return this
  }

  isWithinRange () {
    return elementLines(this.el) <= this.maxLines
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
    // strip trailing spaces, commas, and dots before ellipsis is applied
    while ([' ', '.', ','].includes(this.processed[this.processed.length - 1])) {
      this.processed = this.processed.substring(0, this.processed.length - 1)
    }

    this.el.innerText = `${this.processed}${this.ellipsisSymbol}`
  }
}
