import { setupDirective } from './directive'

export default {
  install (Vue, options) {
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
