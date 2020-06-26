import { getInserted } from './directive.inserted.js'
import { getUpdate } from './directive.update.js'
import { getUnbind } from './directive.unbind.js'
import { getDirectiveName } from './directive.name.js'
import { getSnipText } from '../element/element.snip.js'

export const setupDirective = (options) => {
  const elementMap = new WeakMap()
  const state = {
    elementMap,
    options
  }

  const snipText = getSnipText(state)

  const directiveName = getDirectiveName(state)
  const inserted = getInserted(state, snipText)
  const update = getUpdate(state, snipText)
  const unbind = getUnbind(state, snipText)

  return {
    directiveName,
    inserted,
    update,
    unbind
  }
}
