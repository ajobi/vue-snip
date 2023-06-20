import { mounted, updated, unmounted } from './directive'
import { Plugin } from 'vue'

/*
 * TODOs:
 * - remove the issues shield
 * - migrate from travis to GitHub Actions
 * */
export default ((): Plugin => ({
  install(Vue) {
    const isVue3 = parseFloat(Vue.version[0]) > 2

    Vue.directive('snip', {
      [isVue3 ? 'mounted' : 'inserted']: mounted,
      [isVue3 ? 'updated' : 'update']: updated,
      [isVue3 ? 'unmounted' : 'unbind']: unmounted,
    })
  },
}))()

export * from './types'
