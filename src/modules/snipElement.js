import { Snipper } from './Snipper.js'

export const snipElement = (el) => {
  if (el._snipText.maxLines <= 0) {
    el.innerText = ''
    return
  }

  const snipper = new Snipper(el)

  if (snipper.isWithinRange()) {
    return
  }

  snipper
    .snipSentences()
    .snipWords()
    .snipCharacters()
    .ellipsis()
}
