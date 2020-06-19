import { setupDirective } from './directive'
import { defaultOptions } from './defaultOptions.js'

export default {
  install (Vue, options) {
    options = {
      ...defaultOptions,
      options
    }

    const {
      directiveName,
      inserted,
      update,
      unbind
    } = setupDirective(options)

    Vue.directive(directiveName, {
      inserted,
      update,
      unbind
    })
  }
}
