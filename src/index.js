import { defaultOptions } from './defaultOptions.js'
import { getSnipText } from './element/element.snip'
import { getInserted, getUpdate, getUnbind } from './directive'

export default {
  install (Vue, options) {
    options = {
      ...defaultOptions,
      ...options
    }

    const elementMap = new WeakMap()
    const state = {
      elementMap,
      options
    }

    const snipText = getSnipText(state)
    const inserted = getInserted(state, snipText)
    const update = getUpdate(state, snipText)
    const unbind = getUnbind(state, snipText)

    Vue.directive(options.directiveName, {
      inserted,
      update,
      unbind
    })

    if (options.exposeSnipping) {
      Vue.prototype.$snipText = snipText
    }

    if (options.debugMode) {
      window.__VueSnipState = state
    }
  }
}
