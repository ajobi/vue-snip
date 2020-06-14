import { getComputedLines } from './getComputedLines.js'

const SEPARATOR_SENTENCE = '. '
const SEPARATOR_WORD = ' '

export class ElementSnipper {
  constructor (el) {
    this.el = el
    this.maxLines = el.__snipText.maxLines
    this.unprocessed = el.__snipText.fullText
    this.processed = ''
  }

  snipSentences () {
    const sentences = this.unprocessed.split(SEPARATOR_SENTENCE)

    let sentenceIndex = sentences.length - 1
    for (sentenceIndex; sentenceIndex >= 0; sentenceIndex--) {
      this.el.innerText = `${sentences.slice(0, sentenceIndex).join(SEPARATOR_SENTENCE)}...`

      if (getComputedLines(this.el) <= this.maxLines) {
        break
      }
    }

    this.processed = `${this.processed}${sentences.slice(0, sentenceIndex).join(SEPARATOR_SENTENCE)}`
    this.unprocessed = sentences[sentenceIndex]

    return this
  }

  snipWords () {
    const words = this.unprocessed.split(SEPARATOR_WORD)

    let wordIndex = words.length - 1
    for (wordIndex; wordIndex >= 0; wordIndex--) {
      this.el.innerText = `${this.processed}. ${words.slice(0, wordIndex).join(SEPARATOR_WORD)}...`

      if (getComputedLines(this.el) <= this.maxLines) {
        break
      }
    }

    this.processed = `${this.processed}${words.slice(0, wordIndex).join(SEPARATOR_WORD)}`
    this.unprocessed = words[wordIndex]

    return this
  }

  snipCharacters () {
    const chars = this.unprocessed

    let charIndex = chars.length - 1
    for (charIndex; charIndex >= 0; charIndex--) {
      this.el.innerText = `${this.processed} ${chars.slice(0, charIndex)}...`

      if (getComputedLines(this.el) <= this.maxLines) {
        break
      }
    }

    this.processed = `${this.processed} ${chars.slice(0, charIndex)}`
    this.unprocessed = ''

    return this
  }
}
