import { Snipper } from './Snipper.js'

export const getSnipElement = (elementMap) => (el) => {
  if (elementMap.get(el).maxLines <= 0) {
    el.innerText = ''
    return
  }

  const snipper = new Snipper(el, elementMap)

  if (snipper.isWithinRange()) {
    return
  }

  snipper
    .snipSentences()
    .snipWords()
    .snipCharacters()
    .ellipsis()
}
