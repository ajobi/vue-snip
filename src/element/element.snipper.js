import { elementLines } from './element.lines.js'

const SEPARATOR_SENTENCE = '. '
const SEPARATOR_WORD = ' '
const SEPARATOR_LETTER = ''

export class ElementSnipper {
  constructor (el, state) {
    this.el = el
    this.state = state
    this.unprocessed = null
    this.processed = null
  }

  _snipChunks (separator) {
    if (!this.unprocessed) {
      return this
    }

    const chunks = this.unprocessed.split(separator)
    this.unprocessed = chunks.find(chunk => {
      this.el.innerText = `${this.processed}${chunk}${this.state.options.ellipsis}`

      if (!this.isWithinRange()) {
        return true
      }

      this.processed = `${this.processed}${chunk}${separator}`
    })

    return this
  }

  initText () {
    this.unprocessed = this.state.elementMap.get(this.el).fullText
    this.processed = ''
    this.el.innerText = this.unprocessed

    return this
  }

  isWithinRange () {
    return elementLines(this.el) <= this.state.elementMap.get(this.el).maxLines
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

    this.el.innerText = `${this.processed}${this.state.options.ellipsis}`
  }
}
