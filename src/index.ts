import { defaultOptions } from './defaultOptions'
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

    const isVue3 = Vue.version[0] > 2

    Vue.directive(options.directiveName, {
      [isVue3 ? 'mounted' : 'inserted']: inserted,
      [isVue3 ? 'updated' : 'update']: update,
      [isVue3 ? 'unmounted' : 'unbind']: unbind
    })

    if (options.exposeSnipFunction) {
      Vue.prototype[`$${options.snipFunctionName}`] = snipText
    }

    if (options.debugMode) {
      window.__VueSnipState = state
    }
  }
}
