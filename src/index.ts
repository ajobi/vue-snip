import { inserted, update, unbind } from './directive'
import { Plugin } from 'vue'

export default ((): Plugin => ({
  install(Vue) {
    const isVue3 = parseFloat(Vue.version[0]) > 2

    Vue.directive('snip', {
      [isVue3 ? 'mounted' : 'inserted']: inserted,
      [isVue3 ? 'updated' : 'update']: update,
      [isVue3 ? 'unmounted' : 'unbind']: unbind,
    })
  },
}))()

export * from './types'
