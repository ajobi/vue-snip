import { Snipper } from './Snipper.js'

export const snipElement = (el) => {
  if (el._snipText.maxLines <= 0) {
    el.innerText = ''
    return
  }

  new Snipper(el)
    .snipSentences()
    .snipWords()
    .snipCharacters()
    .ellipsis()
}
